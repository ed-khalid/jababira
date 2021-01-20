import './App.css';
import { useState } from 'react';
import { NewPlayer } from './components/NewPlayer';


export const App = () => {

  const [isCreatingPlayer, setIsCreatingPlayer] = useState<boolean>();

  const createPlayer = () => {
    setIsCreatingPlayer(true)
  } 

  return <div id ="app">
    <header>Jababira</header>
    <section id="main">
      <div id="main-controls">
        {!isCreatingPlayer && <button onClick={() => createPlayer()}>New Player</button>}
      </div>
      <div id="main-section">
          {isCreatingPlayer && <NewPlayer></NewPlayer>}
      </div>
    </section>
  </div>
}

