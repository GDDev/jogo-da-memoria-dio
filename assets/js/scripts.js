const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

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

(function suffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})