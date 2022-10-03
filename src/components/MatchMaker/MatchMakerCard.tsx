import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlayerFull } from "../../App";
import { GetLookupsQuery, Match, MatchType, Position, Squad, VenueType } from "../../generated/types"
import './MatchMakerCard.css'
import { PlayerPicker } from "../PlayerPicker";
import { SquadMaker } from "../SquadMaker";

interface Props {
    match:Match
    lookupsData:GetLookupsQuery|undefined
    allPlayers:Array<PlayerFull>
    setAllPlayers:Dispatch<SetStateAction<Array<PlayerFull>>>
    updateMatch:(key:keyof Match, value:any) => void
    positions:Array<Position>
}

export const MatchMakerCard = ({match, updateMatch, lookupsData, positions, allPlayers, setAllPlayers}:Props) => {
    const [playerBeingDragged, setPlayerBeingDragged] = useState<PlayerFull>();

    const handleNumberOfSquads = (rawValue:String) => {
        const value = Number(rawValue)  
        if (isNaN(value)) {
            updateMatch('squads',[])
        } else {
            const newSquads:Array<Squad> = []  
            for (let i =0; i<value;i++) {
                newSquads.push({id: (i+1)+'', name:'', isJababiraSquad: false})
                updateMatch('squads',newSquads)
            }
        }
    }  
    const setSquad = (index:number) => {
        return (squad:Squad) => {
            const oldSquad = match.squads[index]; 
            const _squads = match.squads.filter(it => it !== oldSquad )   
            updateMatch( 'squads',[..._squads,squad].sort((a,b) => a.id < b.id ? -1 : 1 ))
        }  
    }



    return <div id="match-maker" className="grid">
        <label>Venue</label>
        <select value={match.location.id} onChange={it => updateMatch('location', it.target.value) }>
          <option value={undefined}>Select</option>
          {lookupsData?.lookups?.venues?.map(venue => <option key={'venue-'+venue.id} value={venue.id}>{venue.name}</option>)}
        </select>
        <label>Date</label>
        <input value={match.date} onChange={it => updateMatch('date', it.target.value) } type="date"/>
        <label>Time</label>
        <input value={match.time} onChange={it => updateMatch('time', it.target.value)}type="time"/>
        <label >Type</label>
        <select value={match.type} onChange={it => updateMatch('type', it.target.value) }>
          <option value={undefined}>Select</option>
          {[MatchType.Casual, MatchType.Friendly, MatchType.League].map(matchType => <option key={'match-type-' + matchType.toLowerCase()} value={matchType}>{matchType}</option>)}
        </select>
        <label>Number of Squads</label>
        <select onChange={it => handleNumberOfSquads(it.target.value)  }>
            <option value={undefined}>Select</option>
            {[2,3].map(it =>  <option key={'squad-choice-' + it} value={it}>{it}</option>)}
        </select>
        {match.squads.length && <div id="squads" className="flex">
            {match.squads.map((squad,index) => <SquadMaker setAllPlayers={setAllPlayers} playerBeingDragged={playerBeingDragged} setPlayerBeingDragged={setPlayerBeingDragged} positions={positions} allPlayers={allPlayers} setSquad={setSquad(index)} squad={squad}></SquadMaker> )}
            <PlayerPicker setPlayerBeingDragged={setPlayerBeingDragged} allPlayers={allPlayers}></PlayerPicker>
        </div>}
    </div>
}
  