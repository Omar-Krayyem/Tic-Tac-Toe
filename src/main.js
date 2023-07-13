const gameContainer = document.querySelector(".container");
const intrContainer = document.querySelector(".intro-container");


const cells = document.querySelectorAll(".cell");

const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const resetbtn = document.querySelector(".reset");
const currentTurn = document.querySelector(".current-turn")
const player1Score = document.querySelector(".score1");
const player2Score = document.querySelector(".score2");
const draw = document.querySelector(".draw");
let messageContent = document.querySelector(".content");
const overlay = document.querySelector(".overlay")
const close = document.querySelector(".close");
var btnStart = document.querySelector('.btnStart');
let player1Na = document.querySelector(".player1Name");
let player2Na = document.querySelector(".player2Name");

let player1label = document.getElementById("player1Label");
let player2label = document.getElementById("player2Label");

let usedCells = [];
let winner = false;
let ties = 0;
let turn;



let player1 = {
    player_name: "",
    title : "player1",
    symbol: '<i class="fa-solid fa-xmark" style="color: red;"></i>',
    played: [],
    score: 0
}

let player2 = {
    player_name: "",
    title: "player2",
    symbol: '<i class="fa-sharp fa-solid fa-o" style="color: blue;"></i>',
    played: [],
    score: 0
}

btnStart.addEventListener('click', function() {
    gameContainer.style.display = "flex";
    intrContainer.style.display = "none";
    player1Na = document.getElementById("player1Name").value;
    player2Na = document.getElementById("player2Name").value;
    player1.player_name = player1Na;
    player2.player_name = player2Na;
    player1label.innerHTML = player1Na;
    player2label.innerHTML = player2Na;
});

if(player1.score == 0 && player2.score == 0){
    turn = true;
}
checkTurn();