const deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

const values = [
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
  { name: 'Jack', value: 10 },
  { name: 'Queen', value: 10 },
  { name: 'King', value: 10 },
  { name: 'Ace', value: 11 }  // Ace's value can also be 1, but this needs to be handled in the game logic.
];

// Each card is represented by a Javascript object
suits.forEach(suit => {
  values.forEach(card => {
    deck.push({
      suit: suit,
      name: card.name,
      value: card.value
    });
  });
});

export default deck;
