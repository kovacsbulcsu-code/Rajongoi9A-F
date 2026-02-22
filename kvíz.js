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
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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