// Here I am assigning variables to elements from the HTML

let startGame = document.querySelector('.startGame');
let welcomeMessage = document.querySelector('.welcomeMessage');
let clickMessage = document.querySelector('.clickMessage');
let hitMe = document.querySelector('.hitMe');

// Here I am making a button that clears the welcome messages and starts the game

startGame.addEventListener('click', function () {
    welcomeMessage.innerHTML = '';
    clickMessage.innerHTML = '';
})

// Here I am making arrays of both card values and the suits each value can be attached to

let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
let suits = ['clubs', 'diamonds', 'spades', 'hearts']

// Here I am creating a deck of 52 objects made of key value pairs from values and suits

let deck = [];

function createDeck() {
    for (let i=0; i < values.length; i++) {
        for (let j= 0; j < suits.length; j++) {
            let cards = {
                value: values[i], suit: suits[j]    
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
    // console.log(deck[deal]);
    return deck[deal];
};

randomDeal();

function hitCard () {
    let playerHitCard = randomDeal();
    playerHand.push(playerHitCard);
    console.log(playerHand)
}

// Here I am trying to use my randomDeal function to initally deal 2 cards to the dealer and 2 cards to the player.

// console.log(playerHand);
// console.log(dealerHand);
let playerHand = [];
let dealerHand = [];

function startingDeal() {
    let playerCardOne = randomDeal();
    let playerCardTwo = randomDeal();
    let dealerCardOne = randomDeal();
    let dealerCardTwo = randomDeal();
    playerHand.push(playerCardOne)
    playerHand.push(playerCardTwo)
    dealerHand.push(dealerCardOne)
    dealerHand.push(dealerCardTwo)
    console.log(playerHand)
    console.log(dealerHand)
}

startGame.addEventListener('click', startingDeal);
hitMe.addEventListener('click', hitCard);