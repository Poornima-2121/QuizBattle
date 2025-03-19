let player1Name = "";
let player2Name = "";
let categoryPage = document.querySelector(".categorySelectionSec");
let startPage = document.querySelector(".startSec");
let QuestionsPage = document.querySelector(".QuestionsSec");
let startGameBtn = document.getElementById("startGameBtn");
let dropdown = document.getElementById("categoriesDropdown");
let selectCategoryBtn = document.getElementById("selectCategoryBtn")
let API = "https://the-trivia-api.com/v2/";
let categories = []
let questionNo=0


startGameBtn.addEventListener('click',startGame);
selectCategoryBtn.addEventListener('click',selectCategory)


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
function selectCategory(){
    categoryPage.style.display = "none";
    QuestionsPage.style.display = "block";
    let selectedCategory = dropdown.value;
    selectedCategory = selectedCategory.toLowerCase();
    selectedCategory = selectedCategory.replaceAll(" " , "_");
    selectedCategory = selectedCategory.replaceAll("&","and")
    getQuestions(selectedCategory)
}

async function getQuestions(selectedCategory) {
    let Questions=[]
    let difficuties = ["easy","medium","hard"];
    for (let difficulty of difficuties){
        let url = `${API}questions?categories=${selectedCategory}&difficulties=${difficulty}&limit=2`;
        let response = await fetch(url);
        let data = await response.json();
        Questions.push(...data)
    }
    displayQuestions(Questions)
}

function displayQuestions(Questions){
    questionDisplay(Questions[questionNo])
}

function questionDisplay(questionData){
    let questionEl = document.getElementById("question");
    let optionsEl = document.querySelector(".options");
    questionEl.textContent += questionData.question.text;
    let correctAnswer = questionData.correctAnswer
    let allAnswers = [questionData.correctAnswer,...questionData.incorrectAnswers]
    let shuffledAnswers = shuffleArray(allAnswers.slice())
    shuffledAnswers.forEach((answer)=>{
        const button = document.createElement("button");
        button.textContent = answer
        button.value = answer
        optionsEl.appendChild(button) 
    })
}


function shuffleArray(array){
    for(let i=array.length-1;i>0;i--){
        let j = Math.floor(Math.random()*(i+1));
        [array[i],array[j]] = [array[j],array[i]]
    }
    return array
}