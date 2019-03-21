//Etat initial
let lis = document.querySelectorAll(".sliding ul li");
let matrix = [
  [1, 2, 0],
  [3, 4, 5],
  [6, 7, 8]
]
let sens;
let i = 0;
let animation;

//Mélange les pièces
const suffle = (o) => {
  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
//Render le jeu
const render = (matrix) => {
  i = 0;
  lis = document.querySelectorAll(".sliding ul li");
  let squares = [].concat(matrix[0], matrix[1], matrix[2]);
  for (let i = 0; i < squares.length; i++) {
    lis[i].className = `square${squares[i]}`;
  }
  if (JSON.stringify(squares) === JSON.stringify([1,2,0,3,4,5,6,7,8])){
    console.log('victory');
  }
}

//Animation du slide
const slide = (el,sens) => {
  ('slide');
  if (i<100){
    i+=2.4;
    switch (sens){
      case "right":
        el.style.transform = `translateX(${i}px)`;
        break;
      case "left":
        el.style.transform = `translateX(-${i}px)`;
        break;
      case "down":
        el.style.transform = `translateY(${i}px)`;
        break;
      case "up":
        el.style.transform = `translateY(-${i}px)`;
        break;
    }
    animation = requestAnimationFrame(() => slide(el,sens));
  }
  else {
    cancelAnimationFrame(animation);
    el.style.transform = 'none';
    for (li of lis) {
      li.addEventListener('click', check);
    }
    render(matrix);
  }
}

const check = (e) => {
  let el = parseInt(e.target.className.substring(6));
  let x;
  let y;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].indexOf(el) !== -1) {
      x = i;
      y = matrix[i].indexOf(el);
      let temp = matrix[x][y];
      if (matrix[x - 1] && matrix[x - 1][y] === 0) {
        sens = 'up';
        matrix[x][y] = matrix[x - 1][y];
        matrix[x - 1][y] = temp;
        animation = requestAnimationFrame(() => slide(e.target,sens));
        listenerRemover();
        break;
      }
      else if (matrix[x + 1] && matrix[x + 1][y] === 0) {
        sens = 'down';
        matrix[x][y] = matrix[x + 1][y];
        matrix[x + 1][y] = temp;
        animation = requestAnimationFrame(() => slide(e.target,sens));
        listenerRemover();
        break;
      }
      else if (matrix[x][y - 1] === 0) {
        sens = 'left';
        matrix[x][y] = matrix[x][y - 1];
        matrix[x][y - 1] = temp;
        animation = requestAnimationFrame(() => slide(e.target,sens));
        listenerRemover();
        break;
      }
      else if (matrix[x][y + 1] === 0) {
        sens = 'right';
        matrix[x][y] = matrix[x][y + 1];
        matrix[x][y + 1] = temp;
        animation = requestAnimationFrame(() => slide(e.target,sens));
        listenerRemover();
        break;
      }
    }
  }
}

//Ajoute l'écoute sur le bouton "mélanger"
document.querySelector(".sliding .grey.button").addEventListener("click", () => {
  let squares = suffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  matrix = [
    [squares[0], squares[1], squares[2]],
    [squares[3], squares[4], squares[5]],
    [squares[6], squares[7], squares[8]]
  ];
  render(matrix);
});

//Ecoute des pièces
for (li of lis) {
  li.addEventListener('click', check);
}

function listenerRemover() {
  for (li of lis) {
    li.removeEventListener('click', check);
  }
}