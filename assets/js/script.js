const boxes = Array.from(document.getElementsByClassName('box'));

const O_TEXT = "O";
const X_TEXR = "X";
let currentPlayer = O_TEXT;

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if (index < 3) {
            styleString += `border-bottom: 3px solid #3a3a3a;`;
        }
        if (index % 3 === 0) {
            styleString += `border-right: 3px solid #3a3a3a;`;
        }
        if (index % 3 === 2) {
            styleString += `border-left: 3px solid #3a3a3a;`;
        }
        if (index > 5) {
            styleString += `border-top: 3px solid #3a3a3a;`;
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked)
    })
};

const boxClicked = (e) => {
    console.log('boc clicked');
}

drawBoard();

