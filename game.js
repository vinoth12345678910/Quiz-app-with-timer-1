const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");
const questionCounterText = document.getElementById("questionCounter");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which is the oldest language in the world?",
        choice1: "Tamil",
        choice2: "Kannada",
        choice3: "Chinese",
        choice4: "Hebrew",
        answer: 1
    },
    {
        question: "Who developed the programming language PYTHON?",
        choice1: "Guido Van Rossum",
        choice2: "Nikola Tesla",
        choice3: "Larry Page",
        choice4: "Charles Babbage",
        answer: 1
    },
    {
        question: "Who is your Super Hero?",
        choice1: "Father",
        choice2: "Super Man",
        choice3: "Batman",
        choice4: "Iron Man",
        answer: 1
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice, index) => {
        const number = index + 1;
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
