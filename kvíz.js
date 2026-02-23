const questions = [
    {
        question: "Ki alkotta meg a játékot?",
        answers: [
            { text: "Notch", correct: true},
            { text: "Microsoft", correct: false},
            { text: "Bill Gates", correct: false},
            { text: "Valaki", correct: false},
        ]
    },
    {
        question: "Mikor jelent meg a Minecraft?",
        answers: [
            { text: "2008", correct: false},
            { text: "2010", correct: false},
            { text: "2009", correct: true},
            { text: "2013", correct: false}, 
        ]
    },
     {
        question: "Melyik frissítésben újították meg a falukat?",
        answers: [
            { text: "1.12", correct: false},
            { text: "1.11", correct: false},
            { text: "1.14", correct: true},
            { text: "1.16", correct: false}, 
        ]
    },
     {
        question: "Melyik a legújabb érc a játékban?",
        answers: [
            { text: "smaragd", correct: false},
            { text: "redstone", correct: false},
            { text: "netherite", correct: false},
            { text: "réz", correct: true}, 
        ]
    },
    {
        question: "Mire koncentráltak leginkább a Minecraft legelső verziói?",
        answers: [
            { text: "PvP harcrendszerre", correct: false},
            { text: "Történetmesélésre", correct: false},
            { text: "Építési mechanikára", correct: true},
            { text: "Küldetésalapú játékmenetre", correct: false}, 
        ]
    },
    {
        question: "Melyik vállalat vásárolta meg a Mojang Studios-t 2014-ben?",
        answers: [
            { text: "Sony", correct: false},
            { text: "Nintendo", correct: false},
            { text: "Electronic Arts", correct: false},
            { text: "Microsoft", correct: true}, 
        ]
    },
    {
        question: "Mikor változik meg a Minecraft verziószámozási rendszere év alapú formátumra?",
        answers: [
            { text: "2024", correct: false},
            { text: "2025", correct: false},
            { text: "2026", correct: true},
            { text: "2023", correct: false}, 
        ]
    },
     {
        question: "Melyik új élőlény került be az Update Aquatic frissítéssel?",
        answers: [
            { text: "Axolotl", correct: false},
            { text: "Delfin", correct: true},
            { text: "Warden", correct: false},
            { text: "Piglin", correct: false}, 
        ]
    },
     {
        question: "Melyik tartalomgyártó vált ismertté a manhunt videósorozatáról?",
        answers: [
            { text: "PewDiePie", correct: false},
            { text: "Rolix", correct: false},
            { text: "Dream", correct: true},
            { text: "Technoblade", correct: false}, 
        ]
    },
    {
        question: "Ki volt legendás a Minecraft PvP és kompetitív játékmenet területén?",
        answers: [
            { text: "Technoblade", correct: true},
            { text: "PewDiePie", correct: false},
            { text: "Dream", correct: false},
            { text: "ZsDav", correct: false}, 
        ]
    },
     {
        question: "Mi szükséges egy Brewing Stand működtetéséhez?",
        answers: [
            { text: "Redstone", correct: false},
            { text: "Blaze Powder", correct: true},
            { text: "Glowstone Dust", correct: false},
            { text: "Gunpowder", correct: false}, 
        ]
    },
    {
        question: "Melyik blokkot NEM lehet Silk Touch-tal leszedni?",
        answers: [
            { text: "Stone", correct: false},
            { text: "Grass Block", correct: false},
            { text: "Obsidian", correct: false},
            { text: "Lava", correct: true}, 
        ]
    },
    {
        question: "Melyik potion hatása tart a leghosszabb ideig?",
        answers: [
            { text: "Night Vision", correct: false},
            { text: "Fire Resistance", correct: false},
            { text: "Strength", correct: false},
            { text: "Slow Falling", correct: true}, 
        ]
    },
    {
        question: "Melyik blokkot használják alapként a Beaconhoz?",
        answers: [
            { text: "Iron Block", correct: false},
            { text: "Gold BLock", correct: false},
            { text: "Diamond Block", correct: false},
            { text: "Mindegyiket", correct: true}, 
        ]
    },
    {
        question: "Melyik blokk nem tapad a Slime Blockhoz?",
        answers: [
            { text: "Slime BLock", correct: true},
            { text: "Redstone Block", correct: false},
            { text: "Stone", correct: false},
            { text: "Honey Block", correct: false}, 
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const counterElement = document.getElementById("question-counter");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Következő";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    counterElement.innerHTML = questionNo + " / " + questions.length + " kérdés";
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
});
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){        
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();

    const percentage = Math.round((score / questions.length) * 100).toFixed(2);
    questionElement.innerHTML = `A végeredmény: ${score} / ${questions.length}<br>Elért százalék: ${percentage}%`;
    nextButton.innerHTML = "Újra";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion(); 
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();