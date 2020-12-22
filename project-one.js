
//make start button clickable to start game
document.querySelector('.start-game').addEventListener('click', startGame);


// Using the fisher yates shuffle to randomizes my card array (card deck id)  
function yatesShuffle(cards) {
  var currentIndex = cards.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
  return cards;
  // this returns shuffled deck of cards
}


//create a fucntion (startGame) that grabs cards from html

function startGame() {
  const cards = document.querySelectorAll('.card');
  //console.log(cards);

  // Convert the cards to an array
  const Arr = Array.from(cards);
  //shuffle array with yates shuffle function
  const shuffledCards = yatesShuffle(Arr);

    // Add the shuffled cards back in 
  for (let i = 0; i < shuffledCards.length; i++) {
      const card = shuffledCards[i];

      // Enabling click for each of the cards
      card.addEventListener('click', function() {
        // Display the front
        const front = this.querySelector('.card-front');
        front.style.display = 'block';

        // Hide the back
        const back = this.querySelector('.card-back');
        back.style.display = 'none';
      })

       // Adding the card back into the page
       document.querySelector('#card-deck').appendChild(card);
  }

}























