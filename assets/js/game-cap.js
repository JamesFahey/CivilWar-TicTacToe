const boxes = Array.from(document.getElementsByClassName('box'));

const gameTitle = document.getElementById("gameTitle");
const spaces = [null, null, null, null, null, null, null, null, null,];
let count = 0
const ironmanWins = document.getElementById("ironman-wins");
const captainWins = document.getElementById("captain-wins");
const draw = document.getElementById("draw");
const restartBtnCap = document.getElementById("restartBtnCap");
const restartBtnIron = document.getElementById("restartBtnIron");
const restartBtnDraw = document.getElementById("restartBtnDraw");
let ironman = document.querySelector(".ironman")
let captainAmerica = document.querySelector(".captainAmerica");

const X_TEXT = document.createElement('img').innerHTML="<img src='assets/images/ironman-logo2.png'/>";
const O_TEXT = document.createElement('img').innerHTML="<img src='assets/images/shield.png' />";
let currentPlayer = O_TEXT

// const ironman = X_TEXT
// const captainAmerica = O_TEXT

// player select


// const getParameterByName = (name, url = window.location.href) => {
//     name = name.replace(/[\[\]]/g, '\\$&');
//     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '));
// }
// console.log(ironman);

// currentPlayer = getParameterByName('player');

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
        box.addEventListener('click', boxClicked)
    })
};

// Game play - show result message - show player turn

const boxClicked = (e) => {
    const id = e.target.id;
    if (!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;
        count++;
        if(playerHasWon() & currentPlayer === X_TEXT){
            ironmanWins.classList.add('show');
            return;
        } else if(playerHasWon() & currentPlayer === O_TEXT){
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
        } else captainAmerica.classList.add('active')
    }
}


// register win


const playerHasWon = () => {
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            console.log(`${currentPlayer} wins up top.`)
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            console.log(`${currentPlayer} wins on the left.`)
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            console.log(`${currentPlayer} wins diagonally.`)
            return true;
        }
    } 
    if(spaces[8] === currentPlayer){
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer){
            console.log(`${currentPlayer} wins on the right.`)
            return true;
        }
        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer){
            console.log(`${currentPlayer} wins on the bottom.`)
            return true;
        }
    }
    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            console.log(`${currentPlayer} wins vertically in the middle.`)
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            console.log(`${currentPlayer} wins horizontally across the middle.`)
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer){
            console.log(`${currentPlayer} wins horizontally across the middle.`)
            return true;
        }
    }
}


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
    count = 0
    currentPlayer = O_TEXT
}

restartBtnCap.addEventListener('click', restart);
restartBtnIron.addEventListener('click', restart);
restartBtnDraw.addEventListener('click', restart);


restart();
drawBoard();