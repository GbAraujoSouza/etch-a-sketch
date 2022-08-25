const gridContainer = document.querySelector('.container');
const gridSetBtn16 = document.querySelector('#small-grid');
const gridSetBtn64 = document.querySelector('#large-grid');
const randomColorBtn = document.querySelector('#random-color-btn');
const clearBtn = document.querySelector('#clear-btn');
const rootCssVariables = document.querySelector(':root');

let gridSize = 16;

for (let i = 0; i < gridSize*gridSize; i++) {
    const pixel = document.createElement('div');
    pixel.classList.toggle('grid-pixel');
    gridContainer.appendChild(pixel);
}

let pixels = gridContainer.childNodes;



pixels.forEach((element) => element.addEventListener('click', paintPixel));
clearBtn.addEventListener('click', clearGrid);

function clearGrid() {
    pixels.forEach((element) => element.classList.remove('painted'));
}

function paintPixel(){
    // randomPaintColor(this);
    this.classList.add('painted');
}

function generateRandomColor() {
    let red = Math.round((Math.random() * 0xff)).toString(16);
    let green = Math.round((Math.random() * 0xff)).toString(16);
    let blue = Math.round((Math.random() * 0xff)).toString(16);
    // Don't allow white color, since color is the background
    while (`#${red}${green}${blue}` === '#ffffff') {
        return generateRandomColor();
    }
    return `#${red}${green}${blue}`;
}

function randomPaintColor(pixel) {
    let color = generateRandomColor();
    if (!pixel.classList.contains('painted')) {
        pixel.style.backgroundColor = color;
    }
}