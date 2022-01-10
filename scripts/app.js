// Here I am assigning variables to elements from the HTML

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

// These are the initial dealer cards
let dealerFaceUp = document.querySelector('.dealerFaceUp');
let dealerFaceDown = document.querySelector('.dealerFaceDown');

// These are for if a player wants to hit
let hitCardOne = document.querySelector('.hitCardOne');
let hitCardTwo = document.querySelector('.hitCardTwo');
let hitCardThree = document.querySelector('.hitCardThree');

// These are for when a player stays and it becomes the dealer's turn
let stayCardOne = document.querySelector('.stayCardOne');
let stayCardTwo = document.querySelector('.stayCardTwo');
let stayCardThree = document.querySelector('.stayCardThree');

let gameActive = true;

// let acesHaveChanged = false;

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

// Here I am creating a function that will deal a random card from the deck

function randomDeal() {
    let deal = Math.floor(deck.length * Math.random());
    return deck[deal];
};

// I am making the player and dealer hands both empty arrays

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
    // acesHaveChanged = false;
}

// I want to add one card to the player hand, using my random deal function 

function hitCard() {
    let playerHitCard = randomDeal();
    playerHand.push(playerHitCard);
    console.log('player hand is', playerHand)
    checkBust ();          
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

function dealerTurn() {
    let dealerPlays = randomDeal ();
    dealerFaceDown.innerHTML = dealerCardTwo.value + dealerCardTwo.suit;
    dealerTotalScore = addScore(dealerHand);
    playerTotalScore = addScore(playerHand);
    dealerScore.innerHTML = 'Dealer Score: ' + addScore(dealerHand);
    console.log('number of player cards is ' + playerHand.length);
    console.log('number of dealer cards is ' + dealerHand.length);
    console.log('dealer score is ' + dealerTotalScore);
    console.log('player score is ' + playerTotalScore);
    checkWin();
    if (playerHand.length == 2 && playerTotalScore == 21 && (dealerHand.length == 2 && dealerTotalScore !== 21)) {
        return checkWin ();
    }else
    if ( dealerTotalScore < 17) {
        dealerPlays;
        dealerHand.push(dealerPlays);
        addScore(dealerHand);
        dealerScore.innerHTML = 'Dealer Score: ' + addScore(dealerHand);
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
        return total;
}

function checkBust () {
    playerTotalScore = addScore (playerHand);
    if (playerTotalScore > 21) {
        endGameStatus.innerHTML = 'You bust! Dealer wins'
    }
}

// function checkBustWithAces() {
//     playerTotalScore = addScore(playerHand)
//     if (playerTotalScore > 21 && !checkAce() && !acesHaveChanged) {
//         endGameStatus.innerHTML = 'You bust! Dealer Wins'
//         aceChange ();
//     }else if (playerTotalScore > 21 && !checkAce() && acesHaveChanged) {
//         endGameStatus.innerHTML = 'You bust! Dealer Wins'
//     } else if (playerTotalScore > 21) {
//         endGameStatus.innerHTML = 'You bust! Dealer wins'
//     }
// }

// function checkAce () {  
//     for (let i=0; i < playerHand.length; i++) {
//         if (playerHand[i].value === 'Ace')
//         return true;
//     }
//     return false;
// }

// function aceChange () {  
//     for (let i=0; i < playerHand.length; i++) {
//         if (playerHand[i].value === 'Ace') {
//             playerHand[i].score = 1
//         }
        
//     } acesHaveChanged = true;
//     console.log(playerHand)
//     console.log(playerTotalScore)
// }

function checkWin() {
    dealerTotalScore = addScore(dealerHand)
    playerTotalScore = addScore(playerHand)
    if (playerHand.length == 2 && playerTotalScore == 21 && (dealerHand.length == 2 && dealerTotalScore !== 21)) {
    endGameStatus.innerHTML = 'WINNER WINNER CHICKEN DINNER!'
    } else
        if (dealerTotalScore > 21) {
            endGameStatus.innerHTML = 'Dealer Busts! You Win!'
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
                        


startGame.addEventListener('click', startingDeal, {once : true}); 
hitMe.addEventListener('click', hitCard);
stay.addEventListener('click', dealerTurn);
// restartGame.addEventListener