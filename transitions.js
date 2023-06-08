const header = document.querySelector("header");
const boardSize = document.querySelector("div.board-size");

header.addEventListener("mouseover", () =>{
    boardSize.style.display = "block";
})

header.addEventListener("mouseout", () =>{
    boardSize.style.display = "none";
})