const boxes = Array.from(document.getElementsByClassName('box'));

const gameTitle = document.getElementById("gameTitle");
const spaces = [null, null, null, null, null, null, null, null, null,];
let count = 0
const ironmanWins = document.getElementById("ironman-wins");
const captainWins = document.getElementById("captain-wins");
const draw = document.getElementById("draw");
const restartBtnCaptain = document.getElementById("restartBtnCaptain");
const restartBtnIronman = document.getElementById("restartBtnIronman");
const restartBtnTie = document.getElementById("restartBtnTie");
let ironman = document.querySelector(".ironman")
let captainAmerica = document.querySelector(".captainAmerica");


const X_TEXT = document.createElement('img').innerHTML="<img src='assets/images/ironman-logo2.png'/>";
const O_TEXT = document.createElement('img').innerHTML="<img src='assets/images/shield.png' />";
let currentPlayer = X_TEXT

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

// Game play

// const updateTurn = () => {
//     let ironman = document.querySelector(".ironman")
//     let captainAmerica = document.querySelector(".captainAmerica");
//     ironman.classList.remove('active');
//     captainAmerica.classList.remove('active');
    
//     // if (currentPlayer == X_TEXT) {
//     //     ironman.classList.add('active');
//     // } else captainAmerica.classList.add('active')
        
// }




    // // SAVE ALL MOVES AND THEIR EVALUATIONS
    // let moves = [];

    // // LOOP OVER THE EMPTY SPACES TO EVALUATE THEM
    // for( let i = 0; i < EMPTY_SPACES.length; i++){
    //     // GET THE ID OF THE EMPTY SPACE
    //     let id = EMPTY_SPACES[i];

    //     // BACK UP THE SPACE
    //     let backup = spaces[id];

    //     // MAKE THE MOVE FOR THE PLAYER
    //     spaces[id] = currentPlayer;

    //     // SAVE THE MOVE'S ID AND EVALUATION
    //     let move = {};
    //     move.id = id;
    //     // THE MOVE EVALUATION
    //     if( currentPlayer == O_TEXT){
    //         move.evaluation = minimax(spaces, X_TEXT).evaluation;
    //     }else{
    //         move.evaluation = minimax(spaces, O_TEXT).evaluation;
    //     }

    //     // RESTORE SPACE
    //     spaces[id] = backup;

    //     // SAVE MOVE TO MOVES ARRAY
    //     moves.push(move);
    // }


    


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
        // let id = minimax( spaces, O_TEXT );

        // spaces[id] = O_TEXT;

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

function minimax(spaces, currentPlayer){
    // BASE
if( playerHasWon() & currentPlayer === O_TEXT ) return { evaluation : +10 };
if( playerHasWon() & currentPlayer === X_TEXT      ) return { evaluation : -10 };
if( count === 9                     ) return { evaluation : 0 };

let moves = [];

let move = {};
move.id = id;
// THE MOVE EVALUATION
if( currentPlayer == O_TEXT){
    move.evaluation = minimax(spaces, X_TEXT).evaluation;
}else{
    move.evaluation = minimax(spaces, O_TEXT).evaluation;
    }

// MINIMAX ALGORITHM
let bestMove;

if(currentPlayer == O_TEXT){
    // MAXIMIZER
    let bestEvaluation = -Infinity;
    for(let i = 0; i < moves.length; i++){
        if( moves[i].evaluation > bestEvaluation ){
            bestEvaluation = moves[i].evaluation;
            bestMove = moves[i];
        }
    }
}else{
    // MINIMIZER
    let bestEvaluation = +Infinity;
    for(let i = 0; i < moves.length; i++){
        if( moves[i].evaluation < bestEvaluation ){
            bestEvaluation = moves[i].evaluation;
            bestMove = moves[i];
        }
    }
}

return bestMove;
}


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
    currentPlayer = X_TEXT
}

restartBtnCaptain.addEventListener('click', restart);
restartBtnIronman.addEventListener('click', restart);
restartBtnTie.addEventListener('click', restart);


restart();
drawBoard();