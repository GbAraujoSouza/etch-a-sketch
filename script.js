const gridContainer = document.querySelector('.container');
const gridSetBtn16 = document.querySelector('#small-grid');
const gridSetBtn64 = document.querySelector('#large-grid');
const rainbowColorBtn = document.querySelector('#rainbow');
const blackColorBtn = document.querySelector('#black');
const clearBtn = document.querySelector('#clear-btn');
const rootCssVariables = document.querySelector(':root');

let gridSize = 16;
let pixels = gridContainer.childNodes;
/* 
Each brush color work as a 'state', with refers to the brush that is currently active.
All the states available are:
black -> standard black color;
rainbow -> Each pixel is painted with a random color;
shade -> Each pixel is painted with 10% of black color. Successive clicks adds another 10% until full black
*/
let state = 'black';



for (let i = 0; i < gridSize*gridSize; i++) {
    const pixel = document.createElement('div');
    pixel.classList.toggle('grid-pixel');
    pixel.classList.toggle('blank-pixel');
    gridContainer.appendChild(pixel);
}

// Add an event listener for each pixel to paint on click
pixels.forEach((element) => element.addEventListener('click', paintPixel));

// event listener for the features buttons
clearBtn.addEventListener('click', clearGrid);
rainbowColorBtn.addEventListener('click', changeState);
blackColorBtn.addEventListener('click', changeState);



function changeState() {
    state = this.id;
}

function clearGrid() {
    pixels.forEach((element) => element.style.backgroundColor = 'white');
}

function paintPixel(){
    // paint pixel according with the current state
    let currentState = checkState();
    switch (currentState) {
        case 'black':
            paintBlackColor(this);
            // this.classList.add('black-paint');
        break;

        case 'rainbow':
            paintRandomColor(this);
        break;
    }
}

function checkState(){
    return state;
}

function generateRandomColor() {
    let red = Math.round((Math.random() * 0xff)).toString(16);
    let green = Math.round((Math.random() * 0xff)).toString(16);
    let blue = Math.round((Math.random() * 0xff)).toString(16);

    // Don't allow white color, since color it is the background
    while (`#${red}${green}${blue}` === '#ffffff') {
        return generateRandomColor();
    }
    return `#${red}${green}${blue}`;
}

function paintBlackColor(pixel){
    pixel.style.backgroundColor = 'black';
}

function paintRandomColor(pixel) {
    let color = generateRandomColor();
    pixel.style.backgroundColor = color;
}