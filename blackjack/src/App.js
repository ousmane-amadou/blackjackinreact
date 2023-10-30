// import './App.css';

function App() {
  const gameDeck = require('./deck.json')

  const drawCard = () => { 
    const cardIndex = Math.floor(Math.random()*gameDeck.length)
    return gameDeck.splice(cardIndex, 1)[0]
  } 
  const playerHand = [drawCard(), drawCard()]; 
  const dealerHand = [drawCard(), drawCard()];
  const cardInPlay = drawCard();

  const handleHit = (e) => {
    e.preventDefault()
    playerHand.push(drawCard());
  }

  const handleStay = (e) => {
    e.preventDefault()
  }
  
  return (
    <div className="App">
      <h1>Player 1 Hand </h1>
      { 
        playerHand.map((card, index) => (
            <p key={index}>{card.name}, {card.suit}, {card.value}</p>
        ))
      }
      <button onClick={handleHit}>
        Hit
      </button>
      <button onClick={handleStay}>Test</button>
    </div>
  );
}


export default App;