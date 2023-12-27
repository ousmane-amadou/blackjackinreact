import './App.css';
import Game from './Game';
import { useState } from 'react';

function App() {
  return (
    // <div>
    //   { winner ? (
    //     {winner} 
    //   ) : (
    //     <Game playerHand={playerHand} dealerHand={dealerHand}/>
    //   )}
    // </div>
    <div>
      <Game />
    </div>
  );
}

export default App;