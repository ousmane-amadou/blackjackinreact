// import './App.css';
import {createDeck} from './deck';

function App() {
  const gameDeck = createDeck()

  const drawCard = () => { 
    const cardIndex = Math.floor(Math.random()*gameDeck.length)
    return gameDeck.splice(cardIndex, 1)
  } 
  const playerHand = [drawCard(), drawCard()]; 
  const dealerHand = [drawCard(), drawCard()];
  console.log(playerHand, dealerHand, gameDeck.length)
  
  return (
    <div className="App">
    
    </div>
  );
}


export default App;