//make start button clickable to start game
document.querySelector(".start-game").addEventListener("click", startGame);
let numCards = 0;
let prevCard = null;
let secondCard = null;
let score = 0;
let timer = null;

function startTimer() {
  var seconds = 60;
  timer = setInterval(function () {
    seconds--;
    document.querySelector(".timer").innerHTML = seconds;
    if (seconds === 0) {
      endGame1();
    }
  }, 1000);
}
function endGame1() {
  // 1. Stops the clock
  clearInterval(timer);
  // 2. Display end game message
  document.querySelector(".game-over-message").style.display = "block";
  document.querySelector(".endscore").innerHTML = score;
  // 3. Reset the score
  score = 0;
  document.querySelector(".score").innerHTML = 0;
  document.querySelector("#card-deck").style.display = "none";
  // if all cards are matched the display congratulations message
}
function endGame2() {
  // 1. Stops the clock
  clearInterval(timer);
  // 2. Display you won message
  document.querySelector(".you-won-message").style.display = "block";
  document.querySelector("#card-deck").style.display = "none";
}
// Using the fisher yates shuffle to randomizes my card array (card deck id)
function yatesShuffle(cards) {
  var currentIndex = cards.length,
    temporaryValue,
    randomIndex;
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
  // Reset the timer before starting a new timer
  clearInterval(timer);
  startTimer();
  const cards = document.querySelectorAll(".card");

  // Convert the cards to an array
  const Arr = Array.from(cards);
  //shuffle array with yates shuffle function
  const shuffledCards = yatesShuffle(Arr);

  // Add the shuffled cards back in with this loop
  for (let i = 0; i < shuffledCards.length; i++) {
    const card = shuffledCards[i];

    // Enabling click for each of the cards
    card.addEventListener("click", cardClicked);
    document.querySelector("#card-deck").appendChild(card);
  }
}
function cardClicked() {
  if (numCards === 0) {
    numCards = 1;
    prevCard = this;
    const front = this.querySelector(".card-front");
    front.style.display = "block";

    // Hide the back
    const back = this.querySelector(".card-back");
    back.style.display = "none";
  } else if (numCards === 1) {
    numCards = 2;
    secondCard = this;
    const front = this.querySelector(".card-front");
    front.style.display = "block";
    // Hide the back
    const back = this.querySelector(".card-back");
    back.style.display = "none";
    compare(prevCard, secondCard);
    // Compare the two cards and check if they're the same or not
  }
}

function compare(card1, card2) {
  // Grab the two data ids in html and assign them to id1 and id2
  const id1 = card1.dataset.id;
  const id2 = card2.dataset.id;

  if (id1 === id2) {
    // Remove cards from the page
    setTimeout(() => {
      // Visiblity hidden hides the cards but still preserve the space they were in
      card1.classList.add("the");
      card2.classList.add("the");
      score += 10;
      document.querySelector(".score").innerHTML = score;
      // Check if the game is done by checking if all the cards have the class "the"
      if (document.querySelectorAll(".the").length == 12) {
        endGame2();
      }
    }, 1000);
  } else {
    // Flip them back over if not equal
    setTimeout(() => {
      card1.querySelector(".card-back").style.display = "block";
      card1.querySelector(".card-front").style.display = "none";
      card2.querySelector(".card-back").style.display = "block";
      card2.querySelector(".card-front").style.display = "none";
    }, 1000);
  }



// Clear the variables that stored our flipped cards
  prevCard = null;
  secondCard = null;
  numCards = 0;
}
