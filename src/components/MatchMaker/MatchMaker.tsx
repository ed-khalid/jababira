import { lookupService } from "dns"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PlayerFull } from "../../App"
import { GetLookupsQuery, Match, MatchType, Position, useCreateMatchMutation, VenueType } from "../../generated/types"
import { mapSquadToSquadInput } from "../../models/mappers"
import { Card } from "../Common/Card"
import { MatchMakerCard } from "./MatchMakerCard"

interface Props {
    positions:Array<Position>,
    allPlayers:Array<PlayerFull>
    setAllPlayers:Dispatch<SetStateAction<Array<PlayerFull>>>
    lookupsData:GetLookupsQuery|undefined
} 

export const MatchMaker = ({positions, allPlayers, setAllPlayers, lookupsData}:Props)  => {
        const [match,setMatch]  = useState<Match>({id: '', date:'', time:'', location: { id : '', name: '', address: '', type: VenueType.Indoor  }, type: MatchType.Casual, squads: []  });
        const matchTypes = [MatchType.Casual, MatchType.Friendly, MatchType.League] 
        const [createMatch, createMatchResults] = useCreateMatchMutation()

        const saveMatch = () => {
            const newMatch = {
                date: match.date,
                time: match.time,
                type: match.type,
                venueId: match.location.id,
                squads: match.squads.map(mapSquadToSquadInput)
            }  
            debugger
            createMatch({variables: { match: newMatch}}).then(succ => {}, err => {
                console.log(err)
            } )
        }
        const updateMatch = (key:keyof Match, value:Match[keyof Match]) => {
            if (key === 'location') {
                const newLocation = lookupsData?.lookups.venues.find( it => it.id === value)   
                if (newLocation) {
                  setMatch({...match, ...{[key]: newLocation }})
                }
            } 
            else if (key === 'type') {
                const newType = matchTypes.find(it => it.toString() === value) 
                if (newType) {
                    setMatch({...match,...{[key]: newType}})
                }
            }
            
            else {
                const newMatch = {...match, ...{[key]: value}}
                setMatch({...newMatch})
            }
        } 
        const cancelMatch =  () => {

        }

        return <React.Fragment>
            <Card header="New Match">
                <MatchMakerCard 
                   match = {match}
                   updateMatch={updateMatch}
                   positions={positions} 
                   allPlayers={allPlayers.filter( it => it.isFree)} 
                   setAllPlayers={setAllPlayers} 
                   lookupsData={lookupsData}
                />
            </Card> 
            <div className="actions">
            <button onClick={() => saveMatch()}>Save</button>
            <button onClick={() => cancelMatch()}>Cancel</button>
            </div>
        </React.Fragment>
} 