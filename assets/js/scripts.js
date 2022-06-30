const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
const message = document.getElementById('win');
const restart = document.getElementById('restart');

(function (){
    suffle();
    addClick();
})();

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
    hasFlippedCard = false;
    isOver();
}

function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards()
        return;
    }

    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.style.cursor = "not-allowed";
    secondCard.style.cursor = "not-allowed";

    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function isOver(){
    let cardsFlipped = 0;
    cards.forEach((card) => {
        if(card.classList.contains('flip')) cardsFlipped++;
    })
    if(cardsFlipped === 12){
        message.style.visibility = "visible";
        restart.style.visibility = "visible";
        restart.addEventListener('click', unflipAllCards);
    }
}

function unflipAllCards(){
    restart.classList.add('fa-spin');
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('flip');
            card.style.cursor = "pointer";
        })
        resetBoard();
        message.style.visibility = "hidden";
        restart.style.visibility = "hidden";
        restart.classList.remove('fa-spin');   
        suffle();
        addClick();
    }, 1500);
}

function suffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
}

function addClick(){
    cards.forEach((card) => {
        card.addEventListener('click', flipCard);
    })
}