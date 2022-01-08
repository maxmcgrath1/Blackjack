// Here I am assigning variables to elements from the HTML

let welcomeMessage = document.querySelector('.welcomeMessage');
let clickMessage = document.querySelector('.clickMessage');
let dealerScore = document.querySelector('.dealerScore');
let playerScore = document.querySelector('.playerScore');
let endGameStatus = document.querySelector('.endGameStatus');

let startGame = document.querySelector('.startGame');
let hitMe = document.querySelector('.hitMe');
let stay = document.querySelector('.stay');

let cardOne = document.querySelector('.cardOne');
let cardTwo = document.querySelector('.cardTwo');

let dealerFaceUp = document.querySelector('.dealerFaceUp');
let dealerFaceDown = document.querySelector('.dealerFaceDown');

let hitCardOne = document.querySelector('.hitCardOne');
let hitCardTwo = document.querySelector('.hitCardTwo');
let hitCardThree = document.querySelector('.hitCardThree');

let stayCardOne = document.querySelector('.stayCardOne');
let stayCardTwo = document.querySelector('.stayCardTwo');
let stayCardThree = document.querySelector('.stayCardThree');

let gameActive = true;


// Here I am making a button that clears the welcome messages and starts the game

startGame.addEventListener('click', function () {
    welcomeMessage.innerHTML = '';
    clickMessage.innerHTML = '';
})

// Here I am making arrays of both card values and the suits each value can be attached to

let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
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
    'Jack': 10,
    'Queen': 10,
    'King': 10,
    'Ace': 11 || 1
};
// console.log(cardScores.Queen);

// Here I am creating a deck of 52 objects made of key value pairs from values and suits

let deck = [];

function createDeck() {
    for (let i=0; i < values.length; i++) {
        for (let j= 0; j < suits.length; j++) {
            let cards = {
                value: values[i], suit: suits[j], score: cardScores[values[i]]
            };
            deck.push(cards);
        }
    }
}

createDeck();
// console.log(deck);

// Here I am creating a function that will deal a random card from the deck

function randomDeal() {
    let deal = Math.floor(deck.length * Math.random());
    return deck[deal];
};

// I want to add one card to the player hand, using my random deal function 

function hitCard() {
    let playerHitCard = randomDeal();
    playerHand.push(playerHitCard);
    checkBust ();          
    console.log('player hand is', playerHand)
    if (hitCardOne.innerHTML === '') {
        hitCardOne.innerHTML = playerHitCard.value + playerHitCard.suit;
    } else
        if (hitCardTwo.innerHTML === '') {
            hitCardTwo.innerHTML = playerHitCard.value + playerHitCard.suit;
        } else
            if (hitCardThree.innerHTML === '') {
            hitCardThree.innerHTML = playerHitCard.value + playerHitCard.suit;
            }
    addScore(playerHand, playerTotalScore);
    playerScore.innerHTML = 'Player Score: ' + addScore(playerHand);
}

// Here I am trying to use my randomDeal function to initally deal 2 cards to the dealer and 2 cards to the player.


let playerHand = [];
let dealerHand = [];

let playerCardOne = randomDeal();
let playerCardTwo = randomDeal();
let dealerCardOne = randomDeal();
let dealerCardTwo = randomDeal();

function startingDeal() {
    playerCardOne;
    playerCardTwo;
    dealerCardOne;
    dealerCardTwo;
    playerHand.push(playerCardOne);
    playerHand.push(playerCardTwo);
    dealerHand.push(dealerCardOne);
    dealerHand.push(dealerCardTwo);
    console.log('player hand is', playerHand);
    cardOne.innerHTML = playerCardOne.value + playerCardOne.suit;
    cardTwo.innerHTML = playerCardTwo.value + playerCardTwo.suit;
    console.log('dealer hand is', dealerHand);
    dealerFaceUp.innerHTML = dealerCardOne.value + dealerCardOne.suit;
    dealerFaceDown.innerHTML = '?'
    addScore(playerHand, playerTotalScore);
    addScore(dealerHand, dealerTotalScore);
    dealerScore.innerHTML = 'Dealer Score: ?'
    playerScore.innerHTML = 'Player Score: ' + addScore(playerHand);
}


function dealerTurn() {
    let dealerPlays = randomDeal ();
    dealerFaceDown.innerHTML = dealerCardTwo.value + dealerCardTwo.suit;
    dealerTotalScore = addScore(dealerHand);
    dealerScore.innerHTML = 'Dealer Score: ' + addScore(dealerHand);
    if (dealerTotalScore < 17) {
        dealerPlays;
        dealerHand.push(dealerPlays);
        addScore(dealerHand);
        dealerScore.innerHTML = 'Dealer Score: ' + addScore(dealerHand);
        checkWin();
        if (stayCardOne.innerHTML === '') {
            stayCardOne.innerHTML = dealerPlays.value + dealerPlays.suit
            return dealerTurn();    
        } else if (stayCardTwo.innerHTML === '') {
            stayCardTwo.innerHTML = dealerPlays.value + dealerPlays.suit
            return dealerTurn(); 
        } else {
            stayCardThree.innerHTML = dealerPlays.value + dealerPlays.suit
        }
    } 
}

let dealerTotalScore = 0
let playerTotalScore = 0

function addScore (hand, total) {
    total = 0
    for (let i = 0; i < hand.length; i++) {
        total += hand[i].score
        }
        console.log(total)
        return total;
}

function checkBust() {
    playerTotalScore = addScore(playerHand)
    console.log(playerTotalScore)
    if (playerTotalScore > 21) {
        console.log('bust');
        endGameStatus.innerHTML = 'You bust, dealer wins'
    }
}

function checkWin() {
    dealerTotalScore = addScore(dealerHand)
    playerTotalScore = addScore(playerHand)
    if (dealerTotalScore > 21) {
        endGameStatus.innerHTML = 'Dealer busts! You win!'
    }
    
}



startGame.addEventListener('click', startingDeal);
hitMe.addEventListener('click', hitCard);
stay.addEventListener('click', dealerTurn);