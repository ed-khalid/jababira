import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlayerFull } from "../App";
import { GetLookupsQuery, Match, MatchType, Position, Squad, VenueType } from "../generated/types"
import './MatchMaker.css'
import { PlayerPicker } from "./PlayerPicker";
import { SquadMaker } from "./SquadMaker";

interface Props {
    lookupsData:GetLookupsQuery|undefined
    allPlayers:Array<PlayerFull>
    setAllPlayers:Dispatch<SetStateAction<Array<PlayerFull>>>
    positions:Array<Position>
}

export const MatchMaker = ({lookupsData, positions, allPlayers, setAllPlayers}:Props) => {
    const [match,setMatch]  = useState<Match>({id: '', name: '', location: { id : '', name: '', address: '', type: VenueType.Indoor  }, type: MatchType.Casual, squads: []  });
    const [squads, setSquads] = useState<Array<Squad>>([]) 
    const [playerBeingDragged, setPlayerBeingDragged] = useState<PlayerFull>();

    useEffect(() => {
        console.log(squads)
    }, [squads])

    const handleNumberOfSquads = (rawValue:String) => {
        const value = Number(rawValue)  
        if (isNaN(value)) {
            setSquads([])
        } else {
            const newSquads:Array<Squad> = []  
            for (let i =0; i<value;i++) {
                newSquads.push({id: (i+1)+'', name:''})
                setSquads(newSquads)
            }
        }
    }  
    const setSquad = (index:number) => {
        return (squad:Squad) => {
            const oldSquad = squads[index]; 
            const _squads = squads.filter(it => it !== oldSquad )   
            setSquads([..._squads,squad].sort((a,b) => a.id < b.id ? -1 : 1 ))
        }  
    }



    return <div id="match-maker" className="grid">
        <label>Venue</label>
        <select onChange={it => null }>
          {lookupsData?.lookups?.venues?.map(venue => <option value={venue.name}>{venue.name}</option>)}
        </select>
        <label>Date</label>
        <input type="date"/>
        <label>Time</label>
        <input type="time"/>
        <label>Type</label>
        <select onChange={it => null }>
          {[MatchType.Casual, MatchType.Friendly, MatchType.League].map(matchType => <option value={matchType}>{matchType}</option>)}
        </select>
        <label>Number of Squads</label>
        <select onChange={it => handleNumberOfSquads(it.target.value)  }>
            <option value={undefined}>Select</option>
            {[2,3].map(it =>  <option value={it}>{it}</option>)}
        </select>
        {squads.length && <div id="squads" className="flex">
            {squads.map((squad,index) => <SquadMaker setAllPlayers={setAllPlayers} playerBeingDragged={playerBeingDragged} setPlayerBeingDragged={setPlayerBeingDragged} positions={positions} allPlayers={allPlayers} setSquad={setSquad(index)} squad={squad}></SquadMaker> )}
            <PlayerPicker setPlayerBeingDragged={setPlayerBeingDragged} allPlayers={allPlayers}></PlayerPicker>
        </div>}
    </div>
}
  