let player1Name = "";
let player2Name = "";
let categoryPage = document.querySelector(".categorySelectionSec");
let startPage = document.querySelector(".startSec");
let startGameBtn = document.getElementById("startGameBtn");
let dropdown = document.getElementById("categoriesDropdown");
let API = "https://the-trivia-api.com/v2/";
let categories = []


startGameBtn.addEventListener('click',startGame);

function startGame(){
    player1Name = document.getElementById("player1name").value;
    player2Name = document.getElementById("player2name").value;
    if(player1Name==="" || player2Name===""){
        alert("Enter Player Names");
    }
    else{
        startPage.style.display = "none";
        categoryPage.style.display = "block";
        getcategories();
    }  
}

async function getcategories() {
    let url = `${API}categories`;
    let response = await fetch(url);
    let data = await response.json();
    categories = Object.keys(data)
    displayCategories()
}

function displayCategories(){
    dropdown.innerHTML = "";
    categories.forEach((ele) => {
        dropdown.innerHTML += `<option>${ele}</option>`;
    })
}
