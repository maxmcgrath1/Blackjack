// Here I am assigning variables to elements from the HTML

let welcomeMessage = document.querySelector('.welcomeMessage');
let clickMessage = document.querySelector('.clickMessage');

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

// I want to add one card to the player hand, using my random deal function 

function hitCard () {
    let playerHitCard = randomDeal();
    playerHand.push(playerHitCard);
    console.log(playerHand)
    if (hitCardOne.innerHTML === '') {
        hitCardOne.innerHTML = playerHitCard.value + playerHitCard.suit;
    } else
        if (hitCardTwo.innerHTML === '') {
            hitCardTwo.innerHTML = playerHitCard.value + playerHitCard.suit;
        } else
        if (hitCardThree.innerHTML === '') {
            hitCardThree.innerHTML = playerHitCard.value + playerHitCard.suit;
        }           
}

// Here I am trying to use my randomDeal function to initally deal 2 cards to the dealer and 2 cards to the player.


let playerHand = [];
let dealerHand = [];

function startingDeal() {
    let playerCardOne = randomDeal();
    let playerCardTwo = randomDeal();
    let dealerCardOne = randomDeal();
    let dealerCardTwo = randomDeal();
    playerHand.push(playerCardOne);
    playerHand.push(playerCardTwo);
    dealerHand.push(dealerCardOne);
    dealerHand.push(dealerCardTwo);
    console.log(playerHand);
    cardOne.innerHTML = playerCardOne.value + playerCardOne.suit;
    cardTwo.innerHTML = playerCardTwo.value + playerCardTwo.suit;
    console.log(cardOne);
    console.log(playerCardOne.value);
    console.log(cardTwo);
    console.log(playerCardTwo.value);
    console.log(dealerHand);
    dealerFaceUp.innerHTML = dealerCardOne.value + dealerCardOne.suit;
    dealerFaceDown.innerHTML = '?'
}

startGame.addEventListener('click', startingDeal);
hitMe.addEventListener('click', hitCard);
stay.addEventListener('click', function () {
    dealerFaceDown.innerHTML = dealerCardTwo.value + dealerCardTwo.suit;
});
