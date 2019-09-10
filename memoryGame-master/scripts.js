let timer = setInterval(clock, 1000);
let sec = 0;
let min = 0;

"use strict";

let allCards = document.querySelectorAll(".card");
let resetBtn = document.getElementById("reset");
let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;

  checkMatchedCards();
}

function checkMatchedCards() {
  let isMatch = firstCard.dataset.match === secondCard.dataset.match;
  isMatch ? stopCards() : throwBack();
}

function stopCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function throwBack() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  isFlipped = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

allCards.forEach(card => card.addEventListener("click", flipCard));
resetBtn.addEventListener('click', ()=> {
    location.reload();
});


function clock(){
    
    sec += 1;
    if (sec == 60) {
        min += 1;
        sec = 00;
        if (sec == 60) {
            sec = 00;
            min += 1;
        }
    }
    document.getElementById("timer").innerHTML ="Timer: " + min +' min ' + sec + ' sec';  

    if(min == 3) {
        alert('You hit the limit');
        sec = 0;
        min = 0;
        location.reload();
    }
}


(function shuffle() {
  allCards.forEach(card => {
    let randomPosition = Math.ceil(Math.random() * 16);
    card.style.order = randomPosition;
  });
})();
