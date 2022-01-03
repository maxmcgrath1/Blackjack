let startGame = document.querySelector('.startGame');
let welcomeMessage = document.querySelector('.welcomeMessage');
let clickMe = document.querySelector('.clickMe')

startGame.addEventListener('click', function () {
    welcomeMessage.innerHTML = '';
    clickMe.innerHTML = '';
})