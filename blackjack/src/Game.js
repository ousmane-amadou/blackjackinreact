import './App.css';
import { useState, useEffect } from 'react';
import jsonData from './deck.json'

function MyComponent({ winner }) {
  if (winner == 'dealer') {
    return <p>Dealer is the winner!</p>;
  } else if (winner == 'player') {
    return <p>Player is the winner!</p>;
  } else if (winner == 'draw'){
    return <p> It is a draw! </p>
  }
};

function Game() {
  const gameDeck = JSON.parse(JSON.stringify(jsonData));
  const [deck, setDeck] = useState(gameDeck);
  const [winner, setWinner] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const drawCard = () => { 
    const cardIndex = Math.floor(Math.random()*deck.length)
    const card = deck.splice(cardIndex, 1)[0]
  
    console.log(deck.length, cardIndex)
    return card
  } 

  const [playerHand, setPlayerHand] = useState([]); 
  const [dealerHand, setDealerHand] = useState([])

  useEffect(() => {
    console.log("init")
    setPlayerHand([drawCard(), drawCard()]);
    setDealerHand([drawCard()]);
  }, []);

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
  const handleReset = (e) => {
    console.clear()
    setDeck(gameDeck)
    setWinner(''); setButtonDisabled(false);
    setPlayerHand([drawCard(), drawCard()]); 
    setDealerHand([drawCard()]);
  }
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
          <div className="centered-content">
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
              <button onClick={handleReset}> Reset </button>
            </div>
            <div>
              <MyComponent winner={winner}/>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Game;