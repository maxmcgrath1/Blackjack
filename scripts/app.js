// These are my displayed messages
let welcomeMessage = document.querySelector('.welcomeMessage');
let clickMessage = document.querySelector('.clickMessage');
let dealerScore = document.querySelector('.dealerScore');
let playerScore = document.querySelector('.playerScore');
let endGameStatus = document.querySelector('.endGameStatus');

// These are my buttons
let startGame = document.querySelector('.startGame');
let hitMe = document.querySelector('.hitMe');
let stay = document.querySelector('.stay');
let restartGame = document.querySelector('.restartGame');

// These are the inital player cards
let cardOne = document.querySelector('.cardOne');
let cardTwo = document.querySelector('.cardTwo');

let cardOneRank = document.querySelector('.cardOne .rank');
let cardOneSuit = document.querySelector('.cardOne .suit');

let cardTwoRank = document.querySelector('.cardTwo .rank');
let cardTwoSuit = document.querySelector('.cardTwo .suit');

// These are the initial dealer cards
let dealerFaceUp = document.querySelector('.dealerFaceUp');
let dealerFaceDown = document.querySelector('.dealerFaceDown');

let dealerFaceUpRank = document.querySelector('.dealerFaceUp .rank');
let dealerFaceUpSuit = document.querySelector('.dealerFaceUp .suit');

let dealerFaceDownRank = document.querySelector('.dealerFaceDown .rank');
let dealerFaceDownSuit = document.querySelector('.dealerFaceDown .suit');

// These are for if a player wants to hit
let hitCardOne = document.querySelector('.hitCardOne');
let hitCardTwo = document.querySelector('.hitCardTwo');
let hitCardThree = document.querySelector('.hitCardThree');

let hitCardOneRank = document.querySelector('.hitCardOne .rank');
let hitCardOneSuit = document.querySelector('.hitCardOne .suit');

let hitCardTwoRank = document.querySelector('.hitCardTwo .rank');
let hitCardTwoSuit = document.querySelector('.hitCardTwo .suit');

let hitCardThreeRank = document.querySelector('.hitCardThree .rank');
let hitCardThreeSuit = document.querySelector('.hitCardThree .suit');

// These are for when a player stays and it becomes the dealer's turn
let stayCardOne = document.querySelector('.stayCardOne');
let stayCardTwo = document.querySelector('.stayCardTwo');
let stayCardThree = document.querySelector('.stayCardThree');

let stayCardOneRank = document.querySelector('.stayCardOne .rank');
let stayCardOneSuit = document.querySelector('.stayCardOne .suit');

let stayCardTwoRank = document.querySelector('.stayCardTwo .rank');
let stayCardTwoSuit = document.querySelector('.stayCardTwo .suit');

let stayCardThreeRank = document.querySelector('.stayCardThree .rank');
let stayCardThreeSuit = document.querySelector('.stayCardThree .suit');

// These are inital game states
hitMe.disabled = true;
stay.disabled = true;

let acesHaveChanged = false;
let acesHaveChangedDealer = false;

cardOne.style.visibility = 'hidden';
cardTwo.style.visibility = 'hidden';
hitCardOne.style.visibility = 'hidden';
hitCardTwo.style.visibility = 'hidden';
hitCardThree.style.visibility = 'hidden';

dealerFaceUp.style.visibility = 'hidden';
dealerFaceDown.style.visibility = 'hidden';
stayCardOne.style.visibility = 'hidden';
stayCardTwo.style.visibility = 'hidden';
stayCardThree.style.visibility = 'hidden';

let dealerTotalScore = 0
let playerTotalScore = 0

// These are my button event listeners
startGame.addEventListener('click', function () {
    welcomeMessage.innerHTML = '';
    clickMessage.innerHTML = '';
})

startGame.addEventListener('click', startingDeal, {once : true}); 
hitMe.addEventListener('click', hitCard);
stay.addEventListener('click', dealerTurn);

// Here I am making arrays of both card values and the suits each value can be attached to
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let suits = ['♣', '♦', '♠', '♥']

// This object is going to assign an actual numerical value that can be assigned to a card
let cardScores = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q': 10,
    'K': 10,
    'A': 11 || 1
};

// Creating a deck of 52 objects (cards)
let deck = [];

function createDeck() {
    for (let i=0; i < values.length; i++) {
        for (let j= 0; j < suits.length; j++) {
            let cards = {
                value: values[i], 
                suit: suits[j], 
                score: cardScores[values[i]]
            };
            deck.push(cards);
        }
    }
}
// console.log(deck)
createDeck();

// Here I am creating a function that will deal a random card from the deck
function randomDeal() {
    let deal = Math.floor(deck.length * Math.random());
    return deck[deal];
};

// My adding score function
function addScore (hand, total) {
    total = 0
    for (let i = 0; i < hand.length; i++) {
        total += hand[i].score
    }
    return total;
}

// I am making the player and dealer hands both empty arrays
let playerHand = [];
let dealerHand = [];

let playerCardOne = randomDeal();
let playerCardTwo = randomDeal();
let dealerCardOne = randomDeal();
let dealerCardTwo = randomDeal();

// Functions for checking for an ace/busting for the player
function checkForAce() {  
    for (let i=0; i < playerHand.length; i++) {
        if (playerHand[i].value === 'A')
        return true;
    }
    return false;
}

function changeAceScore() { 
    for (let i=0; i < playerHand.length; i++) {
        if (playerHand[i].value === 'A') {
            playerHand[i].score = 1
        } 
    } acesHaveChanged = true;
    playerTotalScore = addScore(playerHand);
}

function checkForBust() {
    playerTotalScore = addScore(playerHand);
    if (playerTotalScore > 21) {
        checkForAce();
        if (checkForAce()) {
            changeAceScore();
            if (playerTotalScore > 21) {
                endGameStatus.innerHTML = 'You Bust! Dealer Wins'
                hitMe.disabled = true;
                stay.disabled = true;
            }
        } else 
            if (!checkForAce()) {
                endGameStatus.innerHTML = 'You Bust! Dealer Wins'
                hitMe.disabled = true;
                stay.disabled = true;
            }
    }
}

// Functions for checking for an ace/busting for the dealer
function checkForAceDealer() {  
    for (let i=0; i < dealerHand.length; i++) {
        if (dealerHand[i].value === 'A')
        return true;
    }
    return false;
}

function changeAceScoreDealer() { 
    for (let i=0; i < dealerHand.length; i++) {
        if (dealerHand[i].value === 'A') {
            dealerHand[i].score = 1
        } 
    } acesHaveChangedDealer = true;
    dealerTotalScore = addScore(dealerHand);
}

function checkForBustDealer() {
    dealerTotalScore = addScore(dealerHand);
    if (dealerTotalScore > 21) {
        checkForAceDealer();
        if (checkForAceDealer()) {
            changeAceScoreDealer();
            if (dealerTotalScore > 21) {
                endGameStatus.innerHTML = 'Dealer Busts, You Win!'
            }
        } else endGameStatus.innerHTML = 'Dealer Busts, You Win!'
    }
}

//The win conditions other than a player bust
function checkWin() {
    dealerTotalScore = addScore(dealerHand)
    playerTotalScore = addScore(playerHand)
    if (playerHand.length == 2 && playerTotalScore == 21 && (dealerHand.length == 2 && dealerTotalScore !== 21)) {
        endGameStatus.innerHTML = 'WINNER WINNER CHICKEN DINNER!'
    } else
        if (dealerTotalScore > 21) {
            checkForBustDealer();
        } else
            if (dealerTotalScore > playerTotalScore) {
                endGameStatus.innerHTML = 'Dealer Wins. Better Luck Next Time!'
            } else
                if (playerTotalScore > dealerTotalScore) {
                    endGameStatus.innerHTML = 'YOU WIN!'
                } else
                    if (playerTotalScore == dealerTotalScore) {
                        endGameStatus.innerHTML = 'You Tied the Dealer. This Round Is A Push'
                    }               
}

// Here I am trying to use my randomDeal function to initally deal 2 cards to the dealer and 2 cards to the player.
function startingDeal() {
    startGame.disabled = true;
    hitMe.disabled = false;
    stay.disabled = false;
    cardOne.style.visibility = 'visible';
    cardTwo.style.visibility = 'visible';
    dealerFaceUp.style.visibility = 'visible';
    dealerFaceDown.style.visibility = 'visible';
    playerCardOne;
    playerCardTwo;
    dealerCardOne;
    dealerCardTwo;
    playerHand.push(playerCardOne);
    playerHand.push(playerCardTwo);
    dealerHand.push(dealerCardOne);
    dealerHand.push(dealerCardTwo);
    cardOneRank.innerHTML = playerCardOne.value;
    cardOneSuit.innerHTML = playerCardOne.suit;
    cardTwoRank.innerHTML = playerCardTwo.value;
    cardTwoSuit.innerHTML = playerCardTwo.suit;
    dealerFaceUpRank.innerHTML = dealerCardOne.value;
    dealerFaceUpSuit.innerHTML = dealerCardOne.suit;
    dealerFaceDownSuit.innerHTML = '?'
    addScore(playerHand, playerTotalScore);
    addScore(dealerHand, dealerTotalScore);
    dealerScore.innerHTML = 'Dealer <br /> Score: <br /> ?'
    playerScore.innerHTML = 'Player <br /> Score: <br /> ' + addScore(playerHand);
    checkForBust();
}

// I want to add one card to the player hand, using my random deal function 
function hitCard() {
    let playerHitCard = randomDeal();
    playerHand.push(playerHitCard);
    if (hitCardOneRank.innerHTML === '') {
        hitCardOneRank.innerHTML = playerHitCard.value, hitCardOneSuit.innerHTML = playerHitCard.suit;
        hitCardOne.style.visibility = 'visible';
    } else
        if (hitCardTwoRank.innerHTML === '') {
        hitCardTwoRank.innerHTML = playerHitCard.value, hitCardTwoSuit.innerHTML = playerHitCard.suit;
        hitCardTwo.style.visibility = 'visible';
        } else
            if (hitCardThreeRank.innerHTML === '') {
            hitCardThreeRank.innerHTML = playerHitCard.value, hitCardThreeSuit.innerHTML = playerHitCard.suit;
            hitCardThree.style.visibility = 'visible';
            }
    addScore(playerHand, playerTotalScore);
    checkForBust();          
    playerScore.innerHTML = 'Player <br /> Score: <br />' + addScore(playerHand);
}

// Dealer's turn-takes place when stay is clicked
function dealerTurn() {
    hitMe.disabled = true;
    stay.disabled = true;
    let dealerPlays = randomDeal();
    dealerFaceDownRank.innerHTML = dealerCardTwo.value;
    dealerFaceDownSuit.innerHTML = dealerCardTwo.suit;
    dealerScore.innerHTML = 'Dealer <br /> Score: <br />' + addScore(dealerHand);
    checkWin();
    if (playerHand.length == 2 && playerTotalScore == 21 && (dealerHand.length == 2 && dealerTotalScore !== 21)) {
        return checkWin ();
    } else
        if (dealerTotalScore < 17) {
            dealerPlays;
            dealerHand.push(dealerPlays);
            addScore(dealerHand);
            dealerScore.innerHTML = 'Dealer <br /> Score: <br />' + addScore(dealerHand);
        if (stayCardOneRank.innerHTML === '') {
            stayCardOneRank.innerHTML = dealerPlays.value, stayCardOneSuit.innerHTML = dealerPlays.suit
            stayCardOne.style.visibility = 'visible';
            return dealerTurn(); 
        } else 
            if (stayCardTwoRank.innerHTML === '') {
                stayCardTwoRank.innerHTML = dealerPlays.value, stayCardTwoSuit.innerHTML = dealerPlays.suit
                stayCardTwo.style.visibility = 'visible';
                return dealerTurn(); 
            } else {
                stayCardThreeRank.innerHTML = dealerPlays.value, stayCardThreeSuit.innerHTML = dealerPlays.suit
                stayCardThree.style.visibility = 'visible';
                return dealerTurn();
            }
        }  
    addScore(dealerHand);
}
