const grid = document.getElementById('grid')
const colorPicker = document.getElementById('colorpicker')
const colorBtn = document.getElementById('colorbtn')
const rainbowBtn = document.getElementById('rainbowbtn')
const eraserBtn = document.getElementById('eraserbtn')
const sizevalue = document.getElementById('value')
const slider = document.getElementById('slider')
const resetBtn = document.getElementById('resetbtn')

const defaultColor = '#333333'
const defaultMode = 'color'
const defaultSize = 25

let currentColor = defaultColor
let currentMode = defaultMode
let currentSize = defaultSize

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
resetBtn.onclick = () => resetGrid()
slider.onmousemove = (e) => updateValue(e.target.value)
slider.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value) {
    setCurrentSize(value)
    updateValue(value)
    reloadGrid()
}

function updateValue(value) {
    sizevalue.innerHTML = `${value} x ${value * 2}`
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

function resetGrid() {
    clearGrid()
    setupGrid(defaultSize)
    slider.value = defaultSize;
}

function clearGrid() {
    grid.innerHTML = ''
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)` + `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (2 * size) * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('gridelement')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }   else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    }   else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
  }
  
window.onload = () => {
    setupGrid(defaultSize)
    activateButton(defaultMode)
}