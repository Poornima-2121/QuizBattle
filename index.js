let player1Name = "";
let player2Name = "";
let categoryPage = document.querySelector(".categorySelectionSec");
let startPage = document.querySelector(".startSec");
let startGameBtn = document.getElementById("startGameBtn");
let API = "https://the-trivia-api.com/v2/";


startGameBtn.addEventListener('click',startGame);

function startGame(){
    player1Name = document.getElementById("player1name").value;
    player2Name = document.getElementById("player2name").value;
    if(player1Name==="" && player2Name===""){
        alert("Enter Player Names");
    }
    else{
        startPage.style.display = "none";
        categoryPage.style.display = "block";
    }  
}

