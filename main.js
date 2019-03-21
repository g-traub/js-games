const gamesNode = document.querySelector('.games');
const minesweeper = document.querySelector('.minesweeper');
const connect4 = document.querySelector('.connect-4');
const hanoi = document.querySelector('.hanoi');
const slider = document.querySelector('.slide');

const games = document.querySelectorAll('.game a');

const hoverin = e => {
  gamesNode.style.background = `rgba(0,0,0,0.9) url('ressources/img/${e.target.innerHTML.split(' ')[0]}.png') `;
}
const hoverout = e => {
  gamesNode.style.background = `rgb(0,0,0)`;
}

for (let game of games){
  game.addEventListener('mouseenter', hoverin);
}

gamesNode.addEventListener('mouseleave', hoverout);
