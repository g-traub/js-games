let boxes = document.querySelectorAll(".minesweeper td");
var possibilitiesArray = [];
let mines = [];
let tbody = document.querySelector('tbody');
const gridBasicState = tbody.innerHTML;
const result = document.querySelector('.result');

initGame(boxes);

function minesGenerator (size=10,quantity=10){
  for(let i = 0 ; i < quantity ; i++){
    let range = size*size - i;
    let random = Math.floor(Math.random() * range);
    /* console.log(random);
    console.log(possibilitiesArray[random]); */
    mines.push(possibilitiesArray[random]);
    possibilitiesArray.splice(random,1);
  }
}
function checkWin(){
  let empty = document.querySelectorAll('.empty');
  if (empty.length === possibilitiesArray.length){
    showMines('win');
    result.innerHTML = 'Gagné!';
  }
}
function firstClick(e) {
  let box = e.target;
  if (mineVerify(box) == true) {
    box.classList.add("mine-clicked");
    setTimeout(function() {
      stopGame(boxes);
      showMines('lose');
    }, 200);
  } else {
    checkAround(box);
  }
  checkWin();
}
function showMines(option){
  for (let mine of mines){
    let box = document.querySelector(`td[data-row='${mine.x}'][data-column='${mine.y}']`);
    if (option === 'lose' && box.className !== 'mine-clicked'){
      box.classList.add("mine");
    }
    else if (option === 'win'){
      box.classList.add('flag');
    }
  }
}
function initGame(boxes, size=10, quantity=10) {
  let row = 1;
  let column = 1;
  boxes.forEach(element => {
    let coordinates = {};
    coordinates.x = row;
    coordinates.y = column;
    possibilitiesArray.push(coordinates);
    if (row < (size)) {
      element.dataset.row = row;
      row++;
      element.dataset.column = column;
    } else {
      element.dataset.row = row;
      element.dataset.column = column;
      row = 1;
      column++;
    }
    element.addEventListener("click", firstClick);
  });
  minesGenerator(size, quantity);
}

document.querySelector(".minesweeper button").addEventListener("click", (e) => {
  e.preventDefault();
  let quantity = parseInt(document.getElementById('quantity').value);
  let size = parseInt(document.getElementById('size').value);
  console.log(size);
  mines = [];
  possibilitiesArray = [];
  tbody.innerHTML = gridBasicState;
  for(let i = 0 ; i < (size-10) ; i++){  //Ajoute le bon nombre de rows 
    let tr = document.createElement('tr');
    tr.innerHTML = `<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>`
    tbody.appendChild(tr);
  }
  let trs = document.querySelectorAll('tr');
  for (let i = 0 ; i < (size-10) ; i++){ //Ajoute les td au rows (gere le nb de colonnes)
    for (let tr of trs){
      let td = document.createElement('td');
      tr.appendChild(td);
    }
  }
  boxes = document.querySelectorAll(".minesweeper td");
  initGame(boxes, size, quantity);
  boxes.forEach(element => {
    element.className = "";
    element.innerHTML = "";
  });
});

function mineVerify(box) {
  if (box.className == "") {
    var mine = false;
    mines.forEach(element => {
      if (box.dataset.row == element.x && box.dataset.column == element.y) {
        mine = true;
      }
    });
  }
  return mine;
}

function checkAround(box) {
  if (box.className == "") {
    let count = 0;
    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        if (x !== 0 || y !== 0) {
          let nextBox = document.querySelector(
            "[data-row=" +
              '"' +
              (parseInt(box.dataset.row) + x) +
              '"' +
              "][data-column =" +
              '"' +
              (parseInt(box.dataset.column) + y) +
              '"' +
              "]"
          );
          if (nextBox) {
            if (mineVerify(nextBox) == true) {
              count++;
            }
          }
        }
      }
    }
    box.classList.add("empty");
    if (count > 0) {
      box.innerHTML = count;
    } else {
      for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          if (x !== 0 || y !== 0) {
            let nextBox = document.querySelector(
              "[data-row=" +
                '"' +
                (parseInt(box.dataset.row) + x) +
                '"' +
                "][data-column =" +
                '"' +
                (parseInt(box.dataset.column) + y) +
                '"' +
                "]"
            );
            if (nextBox) {
              checkAround(nextBox);
            }
          }
        }
      }
    }
  }
}
function stopGame(boxes) {
  boxes.forEach(element => {
    element.removeEventListener("click", firstClick);
  });
  result.innerHTML = 'Perdu! appuyer sur recommencer'
}