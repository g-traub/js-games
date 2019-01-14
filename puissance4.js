const boxes = document.querySelectorAll('.dot');
const columns = document.querySelectorAll('.column');
const invisibleDots = document.querySelectorAll('.invisible-dot');
let x = 1;
let y = 1;
let animation;
let animationBox;
let i = 0;
let turn = "yellow";
let height;
let cell;
let gameEnd = false;

const suggestionOn = (e) => {
  document.querySelector(`.dot${e.currentTarget.id}`).classList.add(turn);
}
const suggestionOff = (e) => {
  document.querySelector(`.dot${e.currentTarget.id}`).classList.remove(turn);
}

const changeTurn = () => {
  if (turn == "yellow") {
    turn = "red";
  } else {
    turn = "yellow";
  }
  columns.forEach(column => {
    column.addEventListener('click', addToken);
    column.addEventListener('mousemove', suggestionOn);
    column.addEventListener('mouseleave', suggestionOff);
  })
  invisibleDots.forEach(dot => {
    dot.addEventListener('click', addToken);
    dot.addEventListener('mousemove', suggestionOn);
    dot.addEventListener('mouseleave', suggestionOff);
  })
};

const dropAnimation = (el,height) => {
  if (i<(height*44)){
    i+=11.2;
    el.style.transform = `translateY(${i}px)`;
    animation = requestAnimationFrame(() => dropAnimation(el,height));
  }
  else {
    cancelAnimationFrame(animation);
    el.classList.remove("yellow");
    el.classList.remove("red");
    el.style.transform = 'none';
    i = 0;
    cell.classList.add(turn);//Lance la  vérification avant le changement du tour, pour éviter un tour de trop;
    verifyWin(cell);
    if (!gameEnd){
      changeTurn();
    }
  }
}

const resetGame = () => {
  i = 0;
  gameEnd = false;
  boxes.forEach(box => {
    box.className = 'dot';
  })
  columns.forEach(column => {
    column.addEventListener('click', addToken);
    column.addEventListener('mousemove', suggestionOn);
    column.addEventListener('mouseleave', suggestionOff);
  })
  invisibleDots.forEach(dot => {
    dot.addEventListener('click', addToken);
    dot.addEventListener('mousemove', suggestionOn);
    dot.addEventListener('mouseleave', suggestionOff);
  })
}
const stopGame = () => {
  columns.forEach(column => {
    column.removeEventListener('click', addToken);
    column.removeEventListener('mousemove', suggestionOn);
    column.removeEventListener('mouseleave', suggestionOff);
  });
  invisibleDots.forEach(dot => {
    dot.removeEventListener('click', addToken);
    dot.removeEventListener('mousemove', suggestionOn);
    dot.removeEventListener('mouseleave', suggestionOff);
  });
  document.querySelector('.container').style.cursor = 'auto';
};

const test = list => {
  let memo = [];
  let count = 0;
  for (cell of list) {
    if (cell.classList.contains(turn)) {
      memo.push(cell);
      count++;
      if (count >= 4) {
        gameEnd = true;
        memo.forEach(element => {
          element.classList.add("victory");
        });
        memo = [];
        stopGame();
        break;
      }
    } else {
      memo = [];
      count = 0;
    }
  }
};

const verifyWin = box => {
  //Création des listes à vérifier
  let listHorizontalNodes = document.querySelectorAll(
    `.dot[data-row='${box.dataset.row}']`
  );
  let listVerticalNodes = document.querySelectorAll(
    `.dot[data-column='${box.dataset.column}']`
  );

  //idem en diagonale
  let listDiagonaleANodes = [box];
  let listDiagonaleBNodes = [box];

  for (let i = 1; i < 7; i++) {
    let nextBoxBottomRight = document.querySelector(
      `.dot[data-row='${parseInt(box.dataset.row) +
        i}'][data-column='${parseInt(box.dataset.column) + i}']`
    );
    let nextBoxTopLeft = document.querySelector(
      `.dot[data-row='${parseInt(box.dataset.row) -
        i}'][data-column='${parseInt(box.dataset.column) - i}']`
    );
    let nextBoxBottomLeft = document.querySelector(
      `.dot[data-row='${parseInt(box.dataset.row) +
        i}'][data-column='${parseInt(box.dataset.column) - i}']`
    );
    let nextBoxTopRight = document.querySelector(
      `.dot[data-row='${parseInt(box.dataset.row) -
        i}'][data-column='${parseInt(box.dataset.column) + i}']`
    );
    if (
      !nextBoxBottomRight &&
      !nextBoxTopLeft &&
      !nextBoxBottomLeft &&
      !nextBoxTopRight
    ) {
      break;
    } else {
      if (nextBoxBottomRight) {
        listDiagonaleANodes.push(nextBoxBottomRight);
      }
      if (nextBoxTopLeft) {
        listDiagonaleANodes.push(nextBoxTopLeft);
      }
      if (nextBoxBottomLeft) {
        listDiagonaleBNodes.push(nextBoxBottomLeft);
      }
      if (nextBoxTopRight) {
        listDiagonaleBNodes.push(nextBoxTopRight);
      }
    }
  }
  listDiagonaleANodes.sort((a, b) => a.dataset.row - b.dataset.row);
  listDiagonaleBNodes.sort((a, b) => a.dataset.row - b.dataset.row);

  //tests sur les listes
    test(listHorizontalNodes);
    test(listVerticalNodes);
    test(listDiagonaleANodes);
    test(listDiagonaleBNodes);
};

const addToken = e => {
  columns.forEach(column => {
    column.removeEventListener('click', addToken);
    column.removeEventListener('mousemove', suggestionOn);
    column.removeEventListener('mouseleave', suggestionOff);
  })
  invisibleDots.forEach(dot => {
    dot.removeEventListener('click', addToken);
    dot.removeEventListener('mousemove', suggestionOn);
    dot.removeEventListener('mouseleave', suggestionOff);
  })
  animationBox = document.querySelector(`.dot${e.currentTarget.id}`);
  animationBox.classList.add(turn);
  let box = e.currentTarget.firstElementChild || document.querySelector(`.dot[data-column='${e.target.id}']`);
  let boxColumn = box.dataset.column;
  let listNodes = document.querySelectorAll(`.dot[data-column='${boxColumn}']`);
  var arrayNodes = [];
  for (var i = 0, n; (n = listNodes[i]); ++i) arrayNodes.push(n);
  arrayNodes.reverse();
  //Tester si un case est occupée en vérifiant si elle possède la classe yellow ou red
  for (cell of arrayNodes) {
    if (cell.className !== "dot") {
      continue;
    } else {
      animation = requestAnimationFrame(() => dropAnimation(animationBox,height));
      height = cell.dataset.row;
      break;
    }
  }
};

//initialise le jeu
boxes.forEach(element => {
  element.dataset.row = x;
  element.dataset.column = y;
  if (x > 6) {
    x = 1;
    y++;
  } else {
    x++;
  }
});
for (const column of columns){
  column.addEventListener('click', addToken);
  column.addEventListener('mousemove', suggestionOn);
  column.addEventListener('mouseleave', suggestionOff);
}
for (const dot of invisibleDots){
  dot.addEventListener('click', addToken);
  dot.addEventListener('mousemove', suggestionOn);
  dot.addEventListener('mouseleave', suggestionOff);
}
document.querySelector('.restart').addEventListener('click',resetGame);