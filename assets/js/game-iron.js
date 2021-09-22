const boxes = Array.from(document.getElementsByClassName('box'));

const gameTitle = document.getElementById("gameTitle");
const spaces = [null, null, null, null, null, null, null, null, null,];
let count = 0;
const ironmanWins = document.getElementById("ironman-wins");
const captainWins = document.getElementById("captain-wins");
const draw = document.getElementById("draw");
const restartBtnCaptain = document.getElementById("restartBtnCaptain");
const restartBtnIronman = document.getElementById("restartBtnIronman");
const restartBtnTie = document.getElementById("restartBtnTie");
let ironman = document.querySelector(".ironman");
let captainAmerica = document.querySelector(".captainAmerica");


const X_TEXT = document.createElement('img').innerHTML="<img src='assets/images/ironman-logo2.png'/>";
const O_TEXT = document.createElement('img').innerHTML="<img src='assets/images/shield.png' />";
let currentPlayer = X_TEXT;

// gameboard design

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if (index < 3) {
            styleString += `border-bottom: 3px solid #ffffff;`;
        }
        if (index % 3 === 0) {
            styleString += `border-right: 3px solid #ffffff;`;
        }
        if (index % 3 === 2) {
            styleString += `border-left: 3px solid #ffffff;`;
        }
        if (index > 5) {
            styleString += `border-top: 3px solid #ffffff;`;
        }
        box.style = styleString;
        
        box.addEventListener('click', boxClicked);
    });
};

// Game play - show result message - show player turn

const boxClicked = (e) => {
    const id = e.target.id;
    if (!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;
        count++;
        if(playerHasWon() && currentPlayer === X_TEXT){
            ironmanWins.classList.add('show');
            return;
        } else if(playerHasWon() && currentPlayer === O_TEXT){
            captainWins.classList.add('show');
            return;
        } else if(count === 9){
            draw.classList.add('show');
            return;
        }
        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        ironman.classList.remove('active');
        captainAmerica.classList.remove('active');

        if (currentPlayer == X_TEXT) {
            ironman.classList.add('active');
        } else captainAmerica.classList.add('active');
    }
};



// register win


const playerHasWon = () => {
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            
            return true;
        }
    } 
    if(spaces[8] === currentPlayer){
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer){
            
            return true;
        }
        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer){
            
            return true;
        }
    }
    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer){
            
            return true;
        }
    }
};

// restart function

const restart = () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    })
    boxes.forEach((box) => {
        box.innerText = "";
      });
    captainWins.classList.remove('show');
    ironmanWins.classList.remove('show');
    draw.classList.remove('show');
    count = 0;
    currentPlayer = X_TEXT;
};

restartBtnCaptain.addEventListener('click', restart);
restartBtnIronman.addEventListener('click', restart);
restartBtnTie.addEventListener('click', restart);


restart();
drawBoard();