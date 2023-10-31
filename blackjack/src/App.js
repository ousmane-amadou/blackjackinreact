import './App.css';

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
  
  const getCardImageURL = (card) => {
    return (
      "assets/cards/" + "card_" + card.suit.toLowerCase() + "_" + 
        card.name.toLowerCase() + ".png"
    )
  }

  return (
    <div className="App">
      <div className="container">
          <div className='dealer'>
            <h1>Dealer </h1>
            { 
              dealerHand.map((card, index) => (
                  <img 
                    key={index}
                    src={getCardImageURL(card)}/>
              ))
            }
          </div>
          <div className='player'>
            <h1>Player</h1>
            { 
              playerHand.map((card, index) => (
                  <img 
                    key={index}
                    src={getCardImageURL(card)}/>
              ))
            }
          </div>
          <div class="play-buttons">
            <button onClick={handleHit}> Hit </button>
            <button onClick={handleStay}>Stay</button>
          </div>
        </div>
    </div>
  );
}


export default App;