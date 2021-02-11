import React, { Dispatch, SetStateAction, useState } from 'react'
import { PlayerFull } from '../App'
import { Color, Player, Position, Squad, SquadPlayer } from '../generated/types'
import { Slider } from './Slider'
import './SquadMaker.css'
interface Props {
    squad:Squad
    setSquad:(squad:Squad) => void
    playerBeingDragged:PlayerFull|undefined
    setPlayerBeingDragged:Dispatch<SetStateAction<PlayerFull|undefined>>;
    allPlayers:Array<PlayerFull>
    setAllPlayers:Dispatch<SetStateAction<Array<PlayerFull>>>
    white?:Array<Player>
    black?:Array<Player>
    positions:Array<Position>
}

enum SquadType {
    JABABIRA, OTHER
}


export const SquadMaker = ({positions, squad, setSquad, playerBeingDragged, setPlayerBeingDragged, allPlayers, setAllPlayers}:Props) => {

    const [squadType, setSquadType] = useState<SquadType>()
    const [isOverDropzone, setIsOverDropzone] = useState<boolean>(false);
    const colors = [Color.Black, Color.White, Color.Red] 
    const addPlayerToSquad = (player:PlayerFull|undefined) => {
        if (player) {
            const newSquad = {...squad}
            if (!newSquad.players) {
            newSquad.players = []
            }
            newSquad.players.push({ id: Math.random() + '', player, position: undefined, performanceRating: 0 })
            setSquad(newSquad)
            player.isFree = false;
            const newAllPlayers = allPlayers.filter(it => it.id !== player.id) 
            setAllPlayers([...newAllPlayers, player ]);
            setPlayerBeingDragged(undefined)
        }
    } 
    const updatePlayerPosition = (player:SquadPlayer, newPosition:Position) => {
        player.position = newPosition
        const otherPlayers = squad.players?.filter(it => it.id !== player.id)
        const newPlayers = [...otherPlayers!, player] 
        const newSquad:Squad = { ...squad, players:newPlayers}
        setSquad(newSquad)
    } 
    const updatePlayerPerformanceRating = (player:SquadPlayer, newValue:number) => {
        player.performanceRating = newValue
        const otherPlayers = squad.players?.filter(it => it.id !== player.id)
        const newPlayers = [...otherPlayers!, player] 
        const newSquad:Squad = { ...squad, players:newPlayers}
        setSquad(newSquad)
    } 
    const onDragOver =  (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }   

    const squadPlayersSort = (a:SquadPlayer, b:SquadPlayer) => {
        const priorities = [Position.Gk, Position.Def, Position.Mid, Position.Fw];  
        if (a.position && b.position) {
            if (priorities.indexOf(a.position) < priorities.indexOf(b.position)) {
                return -1;
            } else {
                return 1;
            }
        }  else if (a.position) {
            return -1; 
        } else {
            return 0; 
        }
    }     

    return <div className="squad-maker grid">
        <div>
            <label>Squad Type</label>
            <select value={squadType} onChange={it => setSquadType(it.target.value as unknown as SquadType) }>
                <option value={undefined}>Select</option>
                <option value={SquadType.JABABIRA}>Jababira Squad</option>
                <option value={SquadType.OTHER}>Guest Squad</option>
            </select>
        </div>
        <div>
        <label>Color</label>
        <select value={squad.color||undefined} onChange={it => setSquad({...squad, color: it.target.value as unknown as Color  })}   >
            <option value={undefined}>Select</option>
            {colors.map(it => <option value={it}>{it}</option> )}
        </select>
        </div>
        {squadType == SquadType.JABABIRA && 
        <React.Fragment>
            <div className="squad-players">
                <label>Players</label>
                <div className={"dropzone" + ((isOverDropzone) ? ' active' : '')    }
                     onDragEnter={ e => setIsOverDropzone(true)}
                     onDragLeave={ e => setIsOverDropzone(false)}
                     onDragOver={e => onDragOver(e) } 
                     onDrop={e => addPlayerToSquad(playerBeingDragged) }
                >
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Position</th>
                                <th>Player</th>
                                <th>Performance Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                        {squad.players?.sort(squadPlayersSort).map((squadPlayer,index) => <tr 
                          key={'squad-player-'+squadPlayer.id}>
                              <td>{index+1}</td>
                              <td>
                                <select onChange={(e) => updatePlayerPosition(squadPlayer, e.target.value as Position) } value={squadPlayer.position || undefined }>
                                    <option value={undefined}>Select</option>
                                    {positions.map(p => <option value={p}>{p}</option>)}
                                </select>
                              </td>
                              <td>
                                  {squadPlayer.player.firstName + ' ' + squadPlayer.player.lastName} 
                              </td>
                              <td>
                                  <Slider input={squadPlayer.performanceRating} output={(newValue) => updatePlayerPerformanceRating(squadPlayer, newValue)}></Slider>
                              </td>
                        </tr> 
                        )}
                        </tbody>
                    </table>
                    <ul>
                    </ul>

                </div>
            </div>
        </React.Fragment>
        }
        {squadType == SquadType.OTHER && 
        <React.Fragment>
            <label>Captain</label>
            <div></div>
        </React.Fragment>
        }
    </div>


}