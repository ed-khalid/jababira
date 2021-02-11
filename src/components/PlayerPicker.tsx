import { Dispatch, SetStateAction } from 'react'
import { PlayerFull } from '../App'
import { Player, Position, Squad, SquadPlayer } from '../generated/types'
import './PlayerPicker.css'

interface Props {
    allPlayers:Array<PlayerFull>
    setPlayerBeingDragged:Dispatch<SetStateAction<PlayerFull|undefined>>;
    // squad:Squad
    // setSquad:(squad:Squad) => void
    // positions:Array<Position>
}

export const PlayerPicker = ({allPlayers, setPlayerBeingDragged}:Props) => {

    return <div className="player-picker">
        <ul>
            {allPlayers.map(player => <li className="squad-player-option" key={'player-'+player.id}><span onDragStart={e => setPlayerBeingDragged(player)} draggable="true">{player.firstName + ' ' + player.lastName}</span></li> )}
        </ul>
    </div>

}