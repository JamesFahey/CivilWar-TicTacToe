const boxes = Array.from(document.getElementsByClassName('box'));

const gameTitle = document.getElementById("gameTitle");
const spaces = [null, null, null, null, null, null, null, null, null,];
const O_TEXT = document.createElement('img').innerHTML="<img src='assets/images/ironman-logo.png'/>";
const X_TEXT = document.createElement('img').innerHTML="<img src='assets/images/shield.png' />";
let currentPlayer = X_TEXT;
const ironmanWins = document.getElementById("ironman-wins");
const captainWins = document.getElementById("captain-wins");

// const ironmanBtn = document.getElementById("ironmanBtn") 
// const captainBtn = document.getElementById("captainBtn");

// ironmanBtn.addEventListener("click", function(){
//     if (ironmanBtn.clicked == true){
//         currentPlayer = O_TEXT;        
//     } if(no.clicked == true) {
//         currentPlayer = X_TEXT;
//     }
// });

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

const boxClicked = (e) => {
    const id = e.target.id;
    if (!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;

        if(playerHasWon() & currentPlayer === O_TEXT){
            ironmanWins.classList.add('show');
            return;
        } else if(playerHasWon() & currentPlayer === X_TEXT){
            captainWins.classList.add('show');
            return;
        }
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
        
    }
}

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
    }
}

drawBoard();