import { useEffect, useState } from "react"
import { Player, useGetPlayersQuery } from "../../generated/types"
import { SortableColumn } from "../Common/SortableColumn"



export const PlayerManager =  () => {

    const { data } = useGetPlayersQuery()
    const [players, setPlayers] = useState<Player[]>([])
    useEffect(() => {
        if (data?.players) {
          setPlayers(data!.players)
        }
    }, [data])

    return (<div>
        <div>Player Manager</div>
        { players && <div id="player-table">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <SortableColumn name="PlayerName" collection={players} property="firstName" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Speed" collection={players} property="attributes.speed" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Dribbling" collection={players} property="attributes.dribble" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Passing" collection={players} property="attributes.pass" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Shooting" collection={players} property="attributes.shoot" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Defense" collection={players} property="attributes.defense" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Heading" collection={players} property="attributes.head" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Goalkeeping" collection={players} property="attributes.gk" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Stamina" collection={players} property="attributes.stamina" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Teamwork" collection={players} property="attributes.team" output={setPlayers}></SortableColumn>
                        <SortableColumn name="Positions" collection={players} property="attributes.position" output={setPlayers}></SortableColumn>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player =><tr key={player.id}>
                        <td>{player.picture ? <img src={player.picture} /> : <img src={'generic.png'} placeholder="Generic" /> }</td>
                        <td>{`${player.firstName} ${player.lastName}`}</td>
                        <td>{player.attributes.speed}</td>
                        <td>{player.attributes.dribble}</td>
                        <td>{player.attributes.pass}</td>
                        <td>{player.attributes.shoot}</td>
                        <td>{player.attributes.defense}</td>
                        <td>{player.attributes.head}</td>
                        <td>{player.attributes.gk}</td>
                        <td>{player.attributes.stamina}</td>
                        <td>{player.attributes.team}</td>
                        <td>{player.attributes.position}</td>
                        </tr>)
                  }
                </tbody>
            </table>
        </div>
    }
    </div>
    )

}