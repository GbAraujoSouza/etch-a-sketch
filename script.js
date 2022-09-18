const gridContainer = document.querySelector('.container');
const gridSetBtn16 = document.querySelector('#small-grid');
const gridSetBtn64 = document.querySelector('#large-grid');
const rainbowColorBtn = document.querySelector('#rainbow');
const blackColorBtn = document.querySelector('#black');
const shadeColorBtn = document.querySelector('#shade');
const clearBtn = document.querySelector('#clear-btn');
const rootCssVariables = document.querySelector(':root');

const SHADE_INCREMENT = 0.1;

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

/*
This flag tracks if the user has clicked the mouse.
Using this alongside with the 'mouseover' event, will create an effect of "click and drag" for the paining
*/
let mouseDownFlag = false;
document.body.onmousedown = () => (mouseDownFlag = true);
document.body.onmouseup = () => (mouseDownFlag = false);

// start grid with a standard 16x16 size
setUpGrid();


// event listener for the features buttons
clearBtn.addEventListener('click', clearGrid);
rainbowColorBtn.addEventListener('click', changeState);
blackColorBtn.addEventListener('click', changeState);
shadeColorBtn.addEventListener('click', changeState);
gridSetBtn16.addEventListener('click', e => setUpGrid(e.target.getAttribute('data-size')));
gridSetBtn64.addEventListener('click', e => setUpGrid(e.target.getAttribute('data-size')));


function setUpGrid(size=gridSize) {
    
    // clear grid container
    gridContainer.innerHTML = '';

    // Change the width of the pixel to fit the container
    rootCssVariables.style.setProperty('--pixel-size', size);

    for (let i = 0; i < size*size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('grid-pixel');
        pixel.addEventListener('mouseover', paintPixel);
        pixel.addEventListener('mousedown', paintPixel);
        gridContainer.appendChild(pixel);
    }
}

function changeState() {
    state = this.id;
}

function clearGrid() {
    // The clear color needed to be transparent,
    // otherwise the pixels at the corners would overlap the container's border.
    pixels.forEach((element) => element.style.backgroundColor = 'transparent');
}

function paintPixel(e){
    console.log(mouseDownFlag);
    if (e.type == 'mouseover' && !mouseDownFlag) return;
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

        case 'shade':
            paintShadeColor(this);
    }
}

function checkState(){
    return state;
}

function generateRandomColor() {
    let red = Math.round((Math.random() * 256));
    let green = Math.round((Math.random() * 256));
    let blue = Math.round((Math.random() * 256));

    return `rgb(${red}, ${green}, ${blue})`;
}

function paintBlackColor(pixel) {
    pixel.style.backgroundColor = 'rgb(0, 0, 0)';
}

function paintRandomColor(pixel) {
    let color = generateRandomColor();
    pixel.style.backgroundColor = color;
}

function paintShadeColor(pixel) {
    // The background is of type 'rgba(red, green, blue, alpha)'
    // and here I am storing only the alpha number from the string
    let currentAlpha = parseFloat(pixel.style.backgroundColor.slice(-4, -1));
    if (!currentAlpha && pixel.style.backgroundColor != 'rgb(0, 0, 0)') {
        if (pixel.style.backgroundColor == 'rgb(0, 0, 0)') {
            return;
        }
        pixel.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';;
    } else if (currentAlpha) {
        pixel.style.backgroundColor = `rgba(0, 0, 0, ${currentAlpha + SHADE_INCREMENT})`;
    }

}