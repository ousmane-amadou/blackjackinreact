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

  const calculateWinner = () => {
    let playerTotal = 0; let dealerTotal = 0;
    for(let i = 0; i < playerHand.length; i++) {
      playerTotal += playerHand[i].value;
    }
    for(let i = 0; i < dealerHand.length; i++) {
      dealerTotal += dealerHand[i].value;
    }
    if(playerTotal>dealerTotal){
      setWinner("player")
    } else if (playerTotal<dealerTotal){
      setWinner("dealer")
    } else {
      setWinner("draw")
    }
  }
  // const checkHand = (hand) => {
  //   let handTotal = 0
    
  //   for(let i = 0; i < hand.length; i++) {
  //     handTotal += hand[i].value
  //   }
  
  //   if (handTotal > 21) {
  //     setButtonDisabled(true);
  //     return "LOSS"
  //   }
  //   else if (handTotal == 21) {
  //     setButtonDisabled(true);
  //     return "WIN"
  //   }
  //   else {
  //     return "PLAYING"
  //   }
  // }

  const handleHit = (e) => {
    const newHand = JSON.parse(JSON.stringify(playerHand))

    newHand.push(drawCard()); setPlayerHand(newHand);
    
    let handTotal = 0
    for(let i = 0; i < newHand.length; i++) {
      handTotal += newHand[i].value
    }
  
    if (handTotal > 21) {
      setButtonDisabled(true);
      setWinner("dealer")
    }
    else if (handTotal == 21) {
      setButtonDisabled(true);
      setWinner("player")
    } 
    
  }

  const handleStay = (e) => {
    const newHand = JSON.parse(JSON.stringify(dealerHand))

    let handTotal;
  
    do {
      newHand.push(drawCard())

      handTotal = 0;
      for(let i = 0; i < newHand.length; i++) {
        handTotal += newHand[i].value
      }
      
      setDealerHand(newHand)
      console.log(handTotal)
    } 
    while(handTotal < 17);
    
    if (handTotal > 21) {
      setButtonDisabled(true);
      setWinner("player")
    }
    else if (handTotal == 21) {
      setButtonDisabled(true);
      setWinner("dealer")
    } else if (handTotal >= 17) {
      calculateWinner()
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