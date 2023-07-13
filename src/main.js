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

for(let i = 0; i <9; i++){
    cells[i].addEventListener('click',() =>{
        if(isEmpty(i)){
            if(turn){
                addSymbol(player1, i);
                turn = false;
                checkWin(player1);
                checkTurn();
            }
            else{
                addSymbol(player2, i);
                turn = true;
                checkWin(player2);
                checkTurn();
            }
        }
        else{
            alert("choose an empty cell");
        }
    })
}

function addSymbol(player, i){
    cells[i].innerHTML = player.symbol;
    player.played.push(i);
    usedCells.push(i);
}

function checkWin(player){
    if(!winner){
        winCombo.some(combo =>{
            if(combo.every(index => player.played.includes(index))){
                if(player.title === "player1"){
                    turn = true;
                }
                else{
                    turn = false;
                }
                winner = true;
                player.score++;
                showScore();
                setTimeout(winnigMessage, 500, player);
                reset();
            }
        })
    }
 
    if(!winner && usedCells.length == 9){
        ties++;
        showScore();
        setTimeout(drawMessage, 500);
        turn = true;
        reset();
    }
}

function isEmpty(i){
    if(usedCells.includes(i)){
        return false;
    }
    return true;
}

function reset(){
    winner = false;
    player1.played = [];
    player2.played = [];
    checkTurn();
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    // usedCells = [];
    usedCells.length = 0;
}

function resetBtn(){
    winner = false;
    turn = true;
    player1.played = [];
    player2.played = [];
    checkTurn();
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    // usedCells = [];
    usedCells.length = 0;
}

resetbtn.addEventListener('click', resetBtn);

function checkTurn(){
    if(turn){
        currentTurn.innerHTML = player1.symbol;
    }
    else{
        currentTurn.innerHTML = player2.symbol;
    }
}

function showScore(){
    player1Score.innerHTML = player1.score;
    player2Score.innerHTML = player2.score;
    draw.innerHTML = ties;  
}

close.addEventListener('click', function(){
    overlay.style.display = "none";
})

function winnigMessage(player){
    overlay.style.display = "flex";
    messageContent.innerHTML = player.player_name + " is the <h2>winner<h2>";
}

function drawMessage (){
    overlay.style.display = "flex";
    messageContent.innerHTML = "<h2>Draw<h2>";
}