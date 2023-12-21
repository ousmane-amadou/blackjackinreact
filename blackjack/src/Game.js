import './App.css';
import { useState } from 'react';


function Game() {
  const gameDeck = require('./deck.json')
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
      return "LOSS";
    }
    else if (handTotal == 21) {
      return "WIN"
    }
    else {
      return "DRAW"
    }
  }

  const handleHit = (e) => {
    e.preventDefault()
    setPlayerHand([...playerHand, drawCard()])
    checkHand(playerHand)
  }

  const handleStay = (e) => {
    const newHand = JSON.parse(JSON.stringify(dealerHand))
    while(checkHand(newHand) === "DRAW") {
      newHand.push(drawCard())
    }
    setDealerHand(newHand)
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
          <div class="play-buttons">
            <button onClick={handleHit}> Hit </button>
            <button onClick={handleStay}> Stand </button>
          </div>
        </div>
    </div>
  );
}

export default Game;