//TOUR D'HANOI
let towers;
let temp;
let towerTarget;
let disk1;
let allDisks;

//initialise les variables
const initVariables = () => {
  towers = document.querySelectorAll('.hanoi ul');
  temp = undefined;
  towerTarget = document.querySelector('.tower-target');
  disk1 = document.querySelector('.disk-1');
  allDisks = document.querySelectorAll('li');
}

//Vérifie la victoire
const checkWin =  () => {
  if (towerTarget.childNodes.length === 6) {
    towerTarget.classList.add('success');
  }
}

//Vérifie et modifie l'attribut draggable et classe css selectable
const draggableVerifier = () => {
  for (const tower of towers){
    const disks = tower.querySelectorAll('li');
    if (disks){
      for (let i = 0 ; i < disks.length ; i++){
        if (i===0){
          disks[i].classList.remove('unselectable');
          disks[i].setAttribute('draggable', 'true');
        }
        else{
          disks[i].classList.add('unselectable');
          disks[i].setAttribute('draggable', 'false');
        }
      }
    }
  }
}

let animation;

const listenerHandler = () => {
  //ajoute les écouteurs sur les disques (pour le drag and drop)
  let element;
  let elementClass;
  for (const disk of allDisks) {
    disk.addEventListener('dragstart', function(e) {
      if (temp){
        /* temp.classList.remove('selected'); */
        temp = undefined;
      }
      if (disk.draggable){
        element = disk;
        elementClass =  disk.className;
        setTimeout(() => disk.className = 'invisible', 0);
      }
    });
    disk.addEventListener('dragend', function() {
      disk.className = elementClass;
    });
  }

  //ajoute les écouteurs sur les tours
  for (let i = 0; i < towers.length; i++) {
    let ul = towers[i];
    //Gestion drag & drop
    ul.addEventListener('dragover', function(e) {
      e.preventDefault();
    }); //Permet de rendre l'ul 'droppable'
    ul.addEventListener('drop', function(e) {
      if (e.target === e.currentTarget && !e.target.firstElementChild || e.target === e.currentTarget && e.target.firstElementChild.dataset.weight > element.dataset.weight){
       
        e.target.insertAdjacentElement('afterbegin', element);
        draggableVerifier();
        checkWin();
      }
    });

    //gestion du click
    ul.addEventListener('click', function() {
      let disk = ul.querySelector('li');
      if (temp) {
        if (disk == null || disk.dataset.weight > temp.dataset.weight || disk.dataset.weight === temp.dataset.weight) {
          window.cancelAnimationFrame(animation);
          ul.insertAdjacentElement('afterbegin', temp);
          draggableVerifier();
          checkWin();
          temp.style.position = 'static';
          temp.style.zIndex = 0;
          temp = undefined;
        }
      } else if (disk){
        temp = disk;
        temp.style.position = 'absolute';
        temp.style.zIndex = -1;
        animation = window.requestAnimationFrame(move);
      }
    });
  }
}
let mouseX;
let mouseY;
document.querySelector('.hanoi').addEventListener('mousemove', function (e){
  mouseX = e.clientX;
  mouseY = e.clientY;
})

function move (){
  temp.style.left = `${mouseX}px`;
  temp.style.top = `${mouseY}px`;
  animation = window.requestAnimationFrame(move);
}

//première initialisation
initVariables();
listenerHandler();
draggableVerifier();

document.querySelector('button').addEventListener('click', function (){
  const hanoi = document.querySelector('.hanoi');
  hanoi.innerHTML = `<ul class="tower-origin">
                      <li class="disk-1" data-weight="1"></li>
                      <li class="disk-2" data-weight="2"></li>
                      <li class="disk-3" data-weight="3"></li>
                      <li class="disk-4" data-weight="4"></li>
                      <li class="disk-5" data-weight="5"></li>
                      <li class="disk-6" data-weight="6"></li>
                    </ul>
                    <ul></ul>
                    <ul class="tower-target"></ul>`;
  initVariables();
  listenerHandler();
  draggableVerifier();
})
//FIN
