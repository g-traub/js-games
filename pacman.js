const boxes = document.querySelectorAll('.box');
let animation;
let i = 0;
let direction ='right';
let presentBox = document.querySelector('.pacman');
let turnNextBox;
let nextTurn;
let score = 0;
const scoreNode= document.querySelector('.score__number');


const animate = (element ,direction) => {
  if (nextBox && nextBox.classList.contains('empty')){
    if (nextBox.classList.contains('dot') || nextBox.classList.contains('big-dot')){
      score += 10 ;
      nextBox.classList.remove('dot');
      nextBox.classList.remove('big-dot');
      scoreNode.innerHTML = score;
    }
    if (i < 100){
      switch (direction){
        case "right":
          element.style.transform = `translateX(${i}%)`;
          nextBox = document.querySelector(`.box[data-row='${element.dataset.row}'][data-column='${parseInt(element.dataset.column)+1}']`);
          break;
        case "left":
          element.style.transform = `translateX(-${i}%)`;
          nextBox = document.querySelector(`.box[data-row='${element.dataset.row}'][data-column='${parseInt(element.dataset.column)-1}']`);
          break;
        case "down":
          element.style.transform = `translateY(${i}%)`;
          nextBox = document.querySelector(`.box[data-row='${parseInt(element.dataset.row)+1}'][data-column='${parseInt(element.dataset.column)}']`);
          break;
        case "up":
          element.style.transform = `translateY(-${i}%)`;
          nextBox = document.querySelector(`.box[data-row='${parseInt(element.dataset.row)-1}'][data-column='${parseInt(element.dataset.column)}']`);
          break;
      }
      i+=10;
      animation = requestAnimationFrame(() => animate(element, direction));
    }
      else{
        if (nextTurn){

        }
        
        element.style.transform = 'none';
        element.classList.remove('pacman');
        element.classList.remove(`pacman-${direction}`);
        nextBox.classList.add('pacman');
        nextBox.classList.add(`pacman-${direction}`);
        i = 0;
        animation = requestAnimationFrame(() => animate(nextBox, direction));
      }
    } 
else {
    cancelAnimationFrame(animation);
    element.style.transform = 'none';
  }
}
const keydownHandler = (e) => {
  e.preventDefault();
  presentBox = document.querySelector('.pacman');
    switch (e.key){
      case 'ArrowRight':
        turnNextBox = document.querySelector(`.box[data-row='${presentBox.dataset.row}'][data-column='${parseInt(presentBox.dataset.column)+1}']`);
        if (turnNextBox && turnNextBox.classList.contains('empty') && e.key.substring(5).toLowerCase() !== direction){
          cancelAnimationFrame(animation);
          nextBox = turnNextBox;
          presentBox.classList.remove(`pacman-${direction}`);
          direction = 'right';
          presentBox.classList.add(`pacman-${direction}`);
          animation = requestAnimationFrame(()=> animate(presentBox, direction));
        }
        else{
          nextTurn = 'right';
        }
        break;
      case 'ArrowLeft':
        turnNextBox = document.querySelector(`.box[data-row='${presentBox.dataset.row}'][data-column='${parseInt(presentBox.dataset.column)-1}']`);
        if (turnNextBox && turnNextBox.classList.contains('empty') && e.key.substring(5).toLowerCase() !== direction){
          cancelAnimationFrame(animation);
          nextBox = turnNextBox;
          presentBox.classList.remove(`pacman-${direction}`);
          direction = 'left';
          presentBox.classList.add(`pacman-${direction}`);
          animation = requestAnimationFrame( ()=> animate(presentBox, direction));
        }
        else{
          nextTurn = 'left';
        }
        break;
      case 'ArrowUp':
        turnNextBox = document.querySelector(`.box[data-row='${parseInt(presentBox.dataset.row)-1}'][data-column='${parseInt(presentBox.dataset.column)}']`);
        if (turnNextBox && turnNextBox.classList.contains('empty') && e.key.substring(5).toLowerCase() !== direction){
          cancelAnimationFrame(animation);
          nextBox = turnNextBox;
          presentBox.classList.remove(`pacman-${direction}`);
          direction = 'up';
          presentBox.classList.add(`pacman-${direction}`);
          animation = requestAnimationFrame( ()=> animate(presentBox, direction));
        }
        else{
          nextTurn = 'up';
        }
        break;
      case 'ArrowDown':
        turnNextBox = document.querySelector(`.box[data-row='${parseInt(presentBox.dataset.row)+1}'][data-column='${parseInt(presentBox.dataset.column)}']`);
        if (turnNextBox && turnNextBox.classList.contains('empty') && e.key.substring(5).toLowerCase() !== direction){
          cancelAnimationFrame(animation);
          nextBox = turnNextBox;
          presentBox.classList.remove(`pacman-${direction}`);
          direction = 'down';
          presentBox.classList.add(`pacman-${direction}`);
          animation = requestAnimationFrame( ()=> animate(presentBox, direction));
        }
        else{
          nextTurn = 'down';
        }
        break;
    }
  }

document.addEventListener('keydown', keydownHandler);
//Numérote les rangs et colonnes
let row = 1;
let column = 1;
for (box of boxes){
  if (column<17){
    box.dataset.row = row;
    box.dataset.column = column;
    column++;
  }
  else{
    box.dataset.row = row;
    box.dataset.column = column;
    row++;
    column = 1;
  }
}

//Débute en le faisant partir à droite
let nextBox = document.querySelector(`.box[data-row='${presentBox.dataset.row}'][data-column='${parseInt(presentBox.dataset.column)+1}']`);
animate(presentBox, 'right');
