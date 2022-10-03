import './App.css';
import { useEffect, useState } from 'react';
import { PlayerEditor } from './components/NewPlayer';
import { Player, Position, useGetLookupsQuery, useGetPlayersQuery } from './generated/types';
import { PlayerList } from './components/PlayerList';
import { MatchMaker } from './components/MatchMaker/MatchMaker';

export type PlayerFull = Player & { isFree:boolean }   

export const App = () => {

  const positions = [Position.Gk, Position.Def, Position.Mid, Position.Fw] 
  const [isCreatingPlayer, setIsCreatingPlayer] = useState<boolean>(false);
  const [isMakingTeams, setIsMakingTeams] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showNewMatch, setShowNewMatch] = useState<boolean>(false);
  const [black, setBlack] = useState<Array<Player>>([])
  const [white, setWhite] = useState<Array<Player>>([])
  const [player, setPlayer] = useState<Player>();
  const [allPlayers, setAllPlayers] = useState<Array<PlayerFull>>([])
  const lookups = useGetLookupsQuery()   
  const { data } = useGetPlayersQuery() 
  
  useEffect(() => {
    if (data && data.players) {
      const players:Array<PlayerFull> = data.players.map( it => ({...it, isFree:true}))   
      setAllPlayers(players)
    }
  }, [data])

  useEffect(() => {
    if (player) {
      setIsCreatingPlayer(true)
    }

  }, [player])

  const createPlayer = () => {
    setIsCreatingPlayer(true)
    setShowControls(false)
  } 
  const makeTeams =  () => {
    setIsMakingTeams(true)
    setShowControls(false)
  }

  const createMatch = () => {
    setShowNewMatch(true)
  } 

  const togglePlayer =  (player:PlayerFull) => {
    if (data && data.players) {
      const isInBlack = black.find(it => it.id === player.id)  
      const isInWhite = white.find(it => it.id === player.id)  
      if (!isInBlack && !isInWhite) {
        setBlack([...black, player])
        const _players = allPlayers.filter(it => it.id !== player.id)   
        player.isFree = false
        setAllPlayers([..._players, player ])
      }
      else if (isInBlack) {
        setBlack(black.filter(it => it.id !== player.id))
        setWhite([...white, player])
      } else {
        setWhite(white.filter(it => it.id !== player.id))
        const _players = allPlayers.filter(it => it.id !== player.id)   
        player.isFree = true
        setAllPlayers([..._players, player ])
      } 
    }
  }


  return <div id ="app" className="grid">
    <header>Jababira</header>
    <section id="sidebar">
      {data?.players && <PlayerList showPlayer={setPlayer} players={allPlayers} togglePlayer={togglePlayer} ></PlayerList>}
    </section>
    <section id="main">
      {showControls && <div id="main-controls">
        <button onClick={() => createPlayer()}>New Player</button>
        <button onClick={() => createMatch()}>New Match</button>
        <button onClick={() => makeTeams()}>Make Teams</button>
      </div>}
      <div id="main-section">
          {isCreatingPlayer && <PlayerEditor existingPlayer={player} onClose={setIsCreatingPlayer}  ></PlayerEditor>}
          {/* {isMakingTeams && <SquadMaker black={black} white={white}></SquadMaker>} */}
          {showNewMatch && 
            <MatchMaker positions={positions} allPlayers={allPlayers} setAllPlayers={setAllPlayers} lookupsData={lookups.data}></MatchMaker>
          }
      </div>
    </section>
  </div>
}

