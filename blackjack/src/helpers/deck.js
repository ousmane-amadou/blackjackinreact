// Used to generate deck.json
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

const values = [
  { name: '02', value: 2 },
  { name: '03', value: 3 },
  { name: '04', value: 4 },
  { name: '05', value: 5 },
  { name: '06', value: 6 },
  { name: '07', value: 7 },
  { name: '08', value: 8 },
  { name: '09', value: 9 },
  { name: '10', value: 10 },
  { name: 'Jack', value: 10 },
  { name: 'Queen', value: 10 },
  { name: 'King', value: 10 },
  { name: 'Ace', value: 11 }  // Ace's value can also be 1, but this needs to be handled in the game logic.
];

// Each card is represented by a Javascript object
const createDeck = () => {
  const deck = [];
  suits.forEach(suit => {
    values.forEach(card => {
      deck.push({
        suit: suit,
        name: card.name,
        value: card.value
      });
    });
  });
  return deck
}
const fs = require('fs');
const Deck = createDeck();
const jsonString = JSON.stringify(Deck, null, 2);

fs.writeFile('deck.json', jsonString, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File has been saved.');
  }
});

