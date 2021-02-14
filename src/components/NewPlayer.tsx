import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetPlayersDocument, GetPlayersQuery, NewPlayer as NewPlayerType, Player, PlayerAttributesInput, Position, useCreatePlayerMutation} from "../generated/types";
import { AttributeSelector } from "./AttributeSelector";
import './NewPlayer.css'

interface Props {
    onClose:Dispatch<SetStateAction<boolean>>;
    existingPlayer:Player|undefined
}


export const PlayerEditor = ({existingPlayer, onClose}:Props) => {

    const [createPlayer, ] = useCreatePlayerMutation()
    const [position, setPosition] = useState<Position>() 

    useEffect(() => {
        if (existingPlayer) {
            setPosition(existingPlayer.attributes.position)
        }

    }, [existingPlayer])

    const numberAttributes:Array<keyof(PlayerAttributesInput)> = [
        'gk',
        'pass',
        'shoot',
        'speed',
        'dribble',
        'stamina',
        'team',
        'iq',
        'defense',
        'head'
    ] 
    const blankPlayer:NewPlayerType = {
        firstName: ''
        ,lastName: ''
        ,dob:'' 
        ,picture: null
        ,attributes: {
            gk: 0
            ,position: Position.Gk 
            ,speed: 0
            ,shoot: 0
            ,pass: 0
            ,dribble:0
            ,stamina:0
            ,team: 0
            ,iq: 0
            ,defense:0
            ,head:0
        }
    } 

    const [player, setPlayer] = useState<NewPlayerType>(existingPlayer? existingPlayer:{...blankPlayer})
    useEffect(() => {
        console.log(player)
    }, [player])

    const modify = (key:keyof(NewPlayerType), value:string) => {
          setPlayer({...player, [key]: value  })
    } 
    const modifyAttributes=(key:keyof(PlayerAttributesInput), value:number) => {
        setPlayer({...player, attributes: { ...player.attributes, [key]: value } })
    }
    const onPositionChange = (newVal:Position) => {
        setPosition(newVal)
        setPlayer({...player, attributes: {...player.attributes, position: newVal}})
    } 

    const notAllMet = () : boolean => {
        return player.firstName === null || 
        player.lastName === null || 
        player.attributes.defense === 0 || 
        player.attributes.speed === 0 || 
        player.attributes.stamina === 0 || 
        player.attributes.shoot === 0 || 
        player.attributes.pass === 0 || 
        player.attributes.team === 0 || 
        player.attributes.gk === 0 || 
        player.attributes.dribble === 0 || 
        player.attributes.iq === 0 || 
        player.attributes.head === 0 
    }
    const save = () => {
        if (existingPlayer) {

        } else {
            createPlayer({variables: { player }, update: (cache,mutationResult) => {
                if (mutationResult.data) {
                    const player = mutationResult.data.CreatePlayer 
                    var query = cache.readQuery<GetPlayersQuery>({ query: GetPlayersDocument })
                    var players = query?.players 
                    if (players) {
                    cache.writeQuery<GetPlayersQuery>({query: GetPlayersDocument, data: { players: [...players, player]  } })
                    }
                }
            }})
            setPlayer({...blankPlayer})
        }
    }

    return <div className="section grid" id="new-player">
        <div id="first-name-cell" className="grid-cell">
            <label htmlFor="first-name" >First Name</label>
            <input id="first-name" value={player.firstName} name="first-name" onChange={(e) => modify('firstName', e.target.value)} type="text"/>
        </div>
        <div id="last-name-cell" className="grid-cell">
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" value={player.lastName} name="last-name" onChange={(e) => modify('lastName', e.target.value)} type="text"/>
        </div>
        <div id="position-cell" className="grid-cell flex">
            <label htmlFor="position">Position</label>
            {['GK', 'DEF', 'MID', 'FW'].map(it => <div key={'position-'+it}>
                <input type="radio" checked={position===it} value={it} name="position" id={"position-"+it} onChange={(e) => onPositionChange(e.target.value as Position) } />
                <label htmlFor={"position-"+it}>{it}</label>
            </div>)}
        </div>
        <div id="attributes" className="grid-cell">
            <div>
              <label>Attributes</label>
            </div>
            <div id="attribute-wrapper">
              {numberAttributes.map(it => 
                <div key={it} className="grid-cell">
                  <label htmlFor={it}>{it}</label>
                  <AttributeSelector name={it} get={player.attributes[it] as number} set={(v) => modifyAttributes(it,Number(v))}></AttributeSelector>
                 </div>
              )}
           </div>
        </div>
        <div className="grid-cell" id="buttons">
            <div id="buttons-wrapper" className="flex">
                <button disabled={notAllMet()} onClick={() => save()}>Save</button>
                <button onClick={() => onClose(false)}>Done</button>
            </div>
        </div>
    </div>

}