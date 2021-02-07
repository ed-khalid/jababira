import React, { useState } from 'react'
import { Color, Player, Squad } from '../generated/types'
import './SquadMaker.css'
interface Props {
    squad:Squad
    setSquad:(squad:Squad) => void
    white?:Array<Player>
    black?:Array<Player>
}

enum SquadType {
    JABABIRA, OTHER
}


export const SquadMaker = ({squad, setSquad}:Props) => {

    const [squadType, setSquadType] = useState<SquadType>()
    const colors = [Color.Black, Color.White, Color.Red] 

    return <div className="squad-maker grid">
        <label>Squad Type</label>
        <select value={squadType} onChange={it => setSquadType(it.target.value as unknown as SquadType) }>
            <option value={undefined}>Select</option>
            <option value={SquadType.JABABIRA}>Jababira Squad</option>
            <option value={SquadType.OTHER}>Guest Squad</option>
        </select>
        <label>Color</label>
        <select value={squad.color||undefined} onChange={it => setSquad({...squad, color: it.target.value as unknown as Color  })}   >
            <option value={undefined}>Select</option>
            {colors.map(it => <option value={it}>{it}</option> )}
        </select>
        {squadType == SquadType.JABABIRA && 
        <React.Fragment>
            <label>Players</label>
            <div></div>
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