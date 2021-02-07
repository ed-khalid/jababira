import { Dispatch, SetStateAction } from "react"
import { PlayerFull } from "../App"
import { Player } from "../generated/types"
import { fullName as playerFullName } from "../models/Player"
import './PlayerList.css'

interface Props {
    players:Array<PlayerFull>
    showPlayer:Dispatch<SetStateAction<Player|undefined>>;
    togglePlayer:(player:PlayerFull) => void
}


export const PlayerList = ({players, showPlayer, togglePlayer}:Props) => {
    players.sort()
    return <ul>
        {players.map(it => <li className={it.isFree? '' : 'taken' } onDoubleClick={() => togglePlayer(it)} key={'player-'+it.id}>{playerFullName(it)}</li>)}
    </ul> 

}