let startGame = document.querySelector('.startGame');
let welcomeMessage = document.querySelector('.welcomeMessage');
let clickMessage = document.querySelector('.clickMessage')
let hitMe = document.querySelector('.hitMe')
startGame.addEventListener('click', function () {
    welcomeMessage.innerHTML = '';
    clickMessage.innerHTML = '';
})