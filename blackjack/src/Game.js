import './App.css';
import { useState, useEffect } from 'react';

function MyComponent({ winner }) {
  if (winner == 'dealer') {
    return <p>Dealer is the winner</p>;
  } else if (winner == 'player') {
    return <p>Player is the winner</p>;
  }
};

function Game() {
  const gameDeck = require('./deck.json')
  const [winner, setWinner] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const drawCard = () => { 
    const cardIndex = Math.floor(Math.random()*gameDeck.length)
    return gameDeck.splice(cardIndex, 1)[0]
  } 
  const [playerHand, setPlayerHand] = useState([drawCard(), drawCard()]); 
  const [dealerHand, setDealerHand] = useState([drawCard()])

  const checkHand = (hand) => {
    let handTotal = 0
    
    for(let i = 0; i < hand.length; i++) {
      handTotal += hand[i].value
    }
  
    if (handTotal > 21) {
      setButtonDisabled(true);
      return "LOSS"
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

    newHand.push(drawCard()); setPlayerHand(newHand);

    if(checkHand(newHand) === "WIN") {
      setWinner("player")
    }
    else if(checkHand(newHand) === "LOSS") {
      setWinner("dealer")
    }
  }

  const handleStay = (e) => {
    const newHand = JSON.parse(JSON.stringify(dealerHand))
    while(checkHand(newHand) === "DRAW") {
      newHand.push(drawCard())
      setDealerHand(newHand)
    }
    if(checkHand(newHand) == "WIN") {
      setWinner("dealer") 
    }
    else {
      setWinner("player")
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
          <h1>Dealer</h1>
          <div className='dealer'>
            { 
              dealerHand.map((card, index) => (
                  <img 
                    key={index}
                    src={getCardImageURL(card)}/>
              ))
            }
          </div>
          <h1>Player</h1>
          <div className='player'>
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
            <MyComponent winner={winner}/>
          </div>
        </div>
    </div>
  );
}

export default Game;