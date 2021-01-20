import { useEffect, useState } from "react";
import { NewPlayer as NewPlayerType, NewPlayerAttributes, Position, useCreatePlayerMutation} from "../generated/types";
import { AttributeSelector } from "./AttributeSelector";
import './NewPlayer.css'



export const NewPlayer = () => {

    const [createPlayer, createPlayerResults] = useCreatePlayerMutation()

    const numberAttributes:Array<keyof(NewPlayerAttributes)> = [
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

    const [player, setPlayer] = useState<NewPlayerType>({
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
    }); 
    useEffect(() => {
        console.log(player)
    }, [player])

    const modify = (key:keyof(NewPlayerType), value:string) => {
          setPlayer({...player, [key]: value  })
    } 
    const modifyAttributes=(key:keyof(NewPlayerAttributes), value:number) => {
        setPlayer({...player, attributes: { ...player.attributes, [key]: value } })
    }
    const save = () => {
        createPlayer({variables: { player } })
    }

    return <div className="section grid" id="new-player">
        <div className="grid-cell">
            <label htmlFor="first-name" >First Name</label>
            <input id="first-name" value={player.firstName} name="first-name" onChange={(e) => modify('firstName', e.target.value)} type="text"/>
        </div>
        <div className="grid-cell">
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" value={player.lastName} name="last-name" onChange={(e) => modify('lastName', e.target.value)} type="text"/>
        </div>
        <div className="flex">
            <div>
              <label>Attributes</label>
            </div>
        <div className="grid">
            {numberAttributes.map(it => <div  key={it} className="grid-cell">
                <label htmlFor={it}>{it}</label>
                <AttributeSelector name={it} get={player.attributes[it] as number} set={(v) => modifyAttributes(it,Number(v))}></AttributeSelector>
            </div>)}
        </div>
        </div>
        <div id="new-player-submit">
            <button onClick={() => save()}>Save</button>
        </div>
    </div>

}