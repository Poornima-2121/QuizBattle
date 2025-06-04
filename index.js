let players = [
    {player1Name:"",player1Score:0},
    {player2Name:"",player2Score:0}
]
let categoryPage = document.querySelector(".categorySelectionSec");
let startPage = document.querySelector(".startSec");
let QuestionsPage = document.querySelector(".QuestionsSec");
let FinalPage = document.querySelector(".FinalPageSec");
let winnerPage = document.querySelector(".winnerSec");
let startGameBtn = document.getElementById("startGameBtn");
let endGameBtn = document.getElementById("endGameBtn");
let anotherRoundBtn = document.getElementById("anotherGameBtn");
let newGameBtn = document.getElementById("newGameBtn");
let dropdown = document.getElementById("categoriesDropdown");
let selectCategoryBtn = document.getElementById("selectCategoryBtn");
let questionEl = document.getElementById("question");
let optionsEl = document.querySelector(".options");
let turnEl = document.getElementById("turn");
let scoresEl = document.getElementById("scores");
let API = "https://the-trivia-api.com/v2/";
let categories = [];
let questionNo=0;
let Questions=[];
let correctAnswer = "";
let difficulty = "";


startGameBtn.addEventListener('click',startGame);
selectCategoryBtn.addEventListener('click',selectCategory);
endGameBtn.addEventListener('click', endGame);
newGameBtn.addEventListener('click',newGame);
anotherRoundBtn.addEventListener('click',anotherRound);

document.querySelectorAll(".options").forEach((item)=>{
    item.addEventListener('click', () => {
        checkAnswer(event.target.value);
        questionNo++;
        displayQuestions(Questions)
    })
})

function startGame(){
    players.player1Score=0;
    players.player2Score=0;
    players.player1Name = document.getElementById("player1name").value;
    players.player2Name = document.getElementById("player2name").value;
    if(players.player1Name==="" || players.player2Name===""){
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
function selectCategory(){
    categoryPage.style.display = "none";
    QuestionsPage.style.display = "block";
    let selectedCategory = dropdown.value;
    index = categories.indexOf(selectedCategory);
    if(index!=-1){
        categories.splice(index,1);
    }
    selectedCategory = selectedCategory.toLowerCase();
    selectedCategory = selectedCategory.replaceAll(" " , "_");
    selectedCategory = selectedCategory.replaceAll("&","and");
    getQuestions(selectedCategory);
}

async function getQuestions(selectedCategory) {
    Questions = []
    let difficuties = ["easy","medium","hard"];
    for (let difficulty of difficuties){
        let url = `${API}questions?categories=${selectedCategory}&difficulties=${difficulty}&limit=2`;
        let response = await fetch(url);
        let data = await response.json();
        Questions.push(...data)
    }
    displayQuestions(Questions);
}

function displayQuestions(Questions){
    if(questionNo<Questions.length){
        questionDisplay(Questions[questionNo]);
    } else {
        if(categories.length==0){
            QuestionsPage.style.display = "none";
            endGame();
        } else{
            QuestionsPage.style.display = "none";
            FinalPage.style.display = "block";
        }
        
    } 
}

function questionDisplay(questionData){
    optionsEl.textContent = "";
    turnDisplay();
    scoreDisplay();
    questionEl.textContent = questionData.question.text;
    correctAnswer = questionData.correctAnswer;
    difficulty = questionData.difficulty;
    let allAnswers = [questionData.correctAnswer,...questionData.incorrectAnswers];
    let shuffledAnswers = shuffleArray(allAnswers.slice());
    shuffledAnswers.forEach((answer)=>{
        const button = document.createElement("button");
        button.textContent = answer;
        button.value = answer;
        button.className = "option";
        optionsEl.appendChild(button); 
    })
}

function turnDisplay(){
    questionNo%2==0?turn.textContent = `${players.player1Name}'s Turn`
    :turn.textContent = `${players.player2Name}'s Turn`;
}

function scoreDisplay(){
    scoresEl.innerHTML = `<h3>${players.player1Name}:${players.player1Score}</h3>
                          <h3>${players.player2Name}:${players.player2Score}</h3>`;
}

function shuffleArray(array){
    for(let i=array.length-1;i>0;i--){
        let j = Math.floor(Math.random()*(i+1));
        [array[i],array[j]] = [array[j],array[i]]
    }
    return array
}

function checkAnswer(answeredChoice){
    let score = 0;
    if(difficulty==="easy"){
        score=10;
    }else if(difficulty==="medium"){
        score=15;
    }else{
        score=20;
    }
    if(answeredChoice==correctAnswer){
        if(questionNo%2==0){
            players.player1Score+=score;
        }else{
            players.player2Score+=score;
        }
    }
}

function endGame(){
    let winnerText = document.getElementById("winnerText");
    winnerText.textContent = "";
    FinalPage.style.display="none";
    winnerPage.style.display="block";
    if(players.player1Score > players.player2Score){
        winnerText.textContent = `${players.player1Name} wins!!`
    } else if(players.player1Score < players.player2Score){
        winnerText.textContent = `${players.player2Name} wins!!`
    } else{
        winnerText.textContent = `Its a Draw!!`
    }
}

function newGame(){
    winnerPage.style.display="none";
    document.getElementById("player1name").value = "";
    document.getElementById("player2name").value = "";
    questionNo = 0;
    questionEl.textContent = "";
    optionsEl.textContent = "";
    scoresEl.textContent = "";
    turnEl.textContent = "";
    startPage.style.display="block";
}

function anotherRound(){
    FinalPage.style.display="none";
    questionNo=0;
    categoryPage.style.display = "block";
    displayCategories();
}