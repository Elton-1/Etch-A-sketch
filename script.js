const sketchBoard = document.querySelector("div.sketch");
const squereInputs = document.querySelector(".board-size-input");
const submitBtn = document.querySelector(".submit-btn");
const alertBox = document.querySelector(".alert-box");
const eraser = document.querySelector(".eraser-container");
const random = document.querySelector(".random-container");
const fillContainer = document.querySelector(".fill-container");
const reset = document.querySelector(".reset");
const undo = document.querySelector(".undo");
const redoContainer = document.querySelector(".redo");

let elements = [];
let redo = [];

let clr = "white";
let fill = false;
let squeres;

function removeSqueresFromBoard() {
    const childs = document.querySelectorAll(".sketch > *");
    childs.forEach(child => {
        sketchBoard.removeChild(child);
    })
}

function addSqueresToBoard(row, col) {
    let height = 100 / row;
    for (let i = 0; i < row; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.style.height = `${height}%`;
        sketchBoard.appendChild(newRow);
        for (let j = 0; j < col; j++) {
            const squere = document.createElement("div");
            squere.classList.add("squere");
            squere.classList.add(`${i}${j}`)
            newRow.appendChild(squere);
        }
    }
    squeres = document.querySelectorAll(".squere");

    squeres.forEach(squere => {
        squere.addEventListener("mouseover", () => {
            if (!fill) {
                squere.style.background = clr;
                elements.push([squere.style.backgroundColor, squere.className]);
                
            } else {
                squeres.forEach(s => {
                    s.style.background = clr;
                });
            }
        })
    })
}

submitBtn.addEventListener("click", () => {
    removeSqueresFromBoard();
    alertBox.style.display = "none";
    let input = squereInputs.value;
    if (input > 100) {
        alertBox.style.display = "block";
        alertBox.textContent = "To many squeres";
        addSqueresToBoard(10, 10);
    }else if(input < 0){
        alertBox.style.display = "block";
        alertBox.textContent = "Cannot enter negative numbers!";
        addSqueresToBoard(10, 10);
    }else if(input == 0){
        alertBox.style.display = "block";
        alertBox.textContent = "Please enter an valid number";
        addSqueresToBoard(10, 10);
    }else {
        addSqueresToBoard(input, input);
    }

});


pickr.on('change', (color, source, instance) => {
    clr = color.toRGBA().toString();
})

eraser.addEventListener("click", () => clr = sketchBoard.style.backgroundColor);

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

random.addEventListener("click", () => clr = getRandomColor());
fillContainer.addEventListener("click", () => {
    (!fill) ? fill = true : fill = false;
    (!fill) ? fillContainer.firstElementChild.textContent = "Fill" : fillContainer.firstElementChild.textContent = "Unfill";
});

reset.addEventListener("click", () => {
    squeres.forEach(squere => squere.style.background = sketchBoard.style.background)
    elements.push(squeres);

})

function undoFun() {
    
    let lastRow = elements[elements.length - 1];
    let chosenColor = sketchBoard.style.backgroundColor;

    if(elements.length > 1){
        for(let i = 0; i < elements.length - 1; i++){
            if(elements[i][1] === lastRow[1]){
                chosenColor = elements[i][0];
            }
        }
    }

    squeres.forEach(squere => {
        if(squere.className === lastRow[1]){
            squere.style.backgroundColor = chosenColor;
        }
    })
    redo.push(lastRow);
    elements.pop();
}

function redoFun(){

    let lastRow = redo[redo.length - 1];
    let chosenColor = lastRow[0];

    squeres.forEach(squere => {
        if(squere.className === lastRow[1]){
            squere.style.backgroundColor = chosenColor;
        }
    })

    elements.push(lastRow);
    redo.pop();
}

undo.addEventListener("click", undoFun);
redoContainer.addEventListener("click", redoFun);

addSqueresToBoard(10, 10);