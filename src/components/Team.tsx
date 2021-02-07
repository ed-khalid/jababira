import { Player } from "../generated/types";

interface Props {
    name:string
    players:Array<Player>
}


export const Team = ({name,players}:Props) => {

    return <div id="team-wrapper">
        <div>{name}</div>
        <ul>
            {players.map(it => <li>{it.firstName}&nbsp;{it.lastName}</li>)}
        </ul>
        <div id="team-attributes" className="grid">
            <label>DEF</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.defense , 0)}</div>
            <label>PASS</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.pass , 0)}</div>
            <label>SHOOT</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.shoot , 0)}</div>
            <label>STAMINA</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.stamina , 0)}</div>
            <label>TEAM</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.team , 0)}</div>
            <label>IQ</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.iq , 0)}</div>
            <label>SPEED</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.speed , 0)}</div>
            <label>GK</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.gk! , 0)}</div>
            <label>DRIBBLE</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.dribble , 0)}</div>
            <label>HEAD</label>
            <div>{players.reduce((acc,it) => acc + it.attributes.head , 0)}</div>
        </div>
    </div>

}  