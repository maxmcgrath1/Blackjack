let startGame = document.querySelector('.startGame');
let welcomeMessage = document.querySelector('.welcomeMessage');
let clickMessage = document.querySelector('.clickMessage')
let hitMe = document.querySelector('.hitMe')

startGame.addEventListener('click', function () {
    welcomeMessage.innerHTML = '';
    clickMessage.innerHTML = '';
})

let values = ['2', '3', '4', '5', '6', '7', '8','9', '10', 'J', 'Q', 'K', 'A'];
let suits = ['clubs', 'diamonds', 'spades', 'hearts']

let deck = [];

function createDeck() {
    for (let i=0; i < values.length; i++) {
        for (let j= 0; j < suits.length; j++) {
            // I want to create an object for each iteration that has key value pairs of suit and value
            let cards = {
                suit: suits[j], value: values[i]
            };
            deck.push(cards);
        }
    }
}

createDeck();
console.log(deck);