const gridContainer = document.querySelector('.container');
const gridSetBtn16 = document.querySelector('#small-grid');
const gridSetBtn64 = document.querySelector('#large-grid');

let gridSize = 64;

for (let i = 0; i < gridSize*gridSize; i++) {
    const pixel = document.createElement('div');
    pixel.classList.toggle('grid-pixel');
    gridContainer.appendChild(pixel);
}

let pixels = gridContainer.childNodes;


function paintPixel(){
    this.classList.add('painted');
    pixels.forEach((element) => element.addEventListener('click', paintPixel));
}

pixels.forEach((element) => element.addEventListener('mousedown', paintPixel));