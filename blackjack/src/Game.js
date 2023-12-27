import './App.css';
import { useState } from 'react';

const MyComponent = ({ winner }) => {
  console.log(winner)
  if (winner === 'dealer') {
    return <p>The condition is true!</p>;
  } else {
    return <p>The condition is false!</p>;
  }
};

function Game() {
  var winner = ""
  const gameDeck = require('./deck.json')
  
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const drawCard = () => { 
    const cardIndex = Math.floor(Math.random()*gameDeck.length)
    return gameDeck.splice(cardIndex, 1)[0]
  } 
  const [playerHand, setPlayerHand] = useState([drawCard(), drawCard()]); 
  const [dealerHand, setDealerHand] = useState([drawCard()])

  const checkHand = (hand) => {
    let handTotal= 0
    
    for(let i = 0; i < hand.length; i++) {
      handTotal += hand[i].value
    }
  
    if (handTotal > 21){
      setButtonDisabled(true);
      return "LOSS";
    }
    else if (handTotal == 21) {
      setButtonDisabled(true);
      return "WIN"
    }
    else {
      return "DRAW"
    }
  }

  const handleHit = (e) => {
    const newHand = JSON.parse(JSON.stringify(playerHand))
    setPlayerHand(newHand)
    if(checkHand(newHand) == "WIN") {
      winner = "player"
    }
    else if(checkHand) {
      winner = "dealer"
    }
  }

  const handleStay = (e) => {
    const newHand = JSON.parse(JSON.stringify(dealerHand))
    while(checkHand(newHand) === "DRAW") {
      newHand.push(drawCard())
    }
    setDealerHand(newHand)
    if(checkHand(newHand) == "WIN") {
      winner = "dealer"
    }
    else {
      winner = "player"
    }
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
          <div className="dealer">
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
          <div className="play-buttons">
            <button onClick={handleHit} disabled={isButtonDisabled}> Hit </button>
            <button onClick={handleStay} disabled={isButtonDisabled}> Stand </button>
          </div>
          <div>

            <MyComponent winner={{winner}}/>
          </div>
        </div>
    </div>
  );
}

export default Game;