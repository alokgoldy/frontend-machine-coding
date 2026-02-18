import { quizData } from './data.js'

// configuration

const QUIZ_DURATION_SECONDS = 60 * 2; // 2 minutes



//state
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = QUIZ_DURATION_SECONDS;
let userAnswers = new Array(quizData.length).fill(null);
let score = 0;
let timeInterval;
let isQuizActive = false;


// dom elements
const timerDisplay = document.getElementById('timer');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const questionNumberDisplay = document.getElementById('question-number');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const currentScoreDisplay = document.getElementById('current-score');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const finalScoreDisplay = document.getElementById('final-score');
const totalScoreDisplay = document.getElementById('total-score');
const feedBackMessage = document.getElementById('feedback-message');


// Initialization
function init() {
    startTimer();
    loadQuestion();
    setupEventListeners();
}

function setupEventListeners() {
    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);
    restartBtn.addEventListener('click', startQuiz);

    // key navigation for options
    optionsContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target;
            if (target.classList.contains('option')) {
                const index = parseInt(target.dataset.index);
                selectOption(index);
            }
        }
    })
}

function startTimer() {
    clearInterval(timerInterval);
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            // endQuiz(true); // true indicates time ran out
            clearInterval(timerInterval);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 10) {
        timerDisplay.parentElement.style.color = 'red';
    } else {
        timerDisplay.parentElement.style.color = ''; // Reset
    }
}

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    questionText.textContent = question.question;

    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionElement.tabIndex = 0;
        optionElement.setAttribute('role', 'button');
        optionElement.setAttribute('aria-pressed', 'false');

        // check if previously selected
        // if (userAnswers[currentQuestionIndex] === index) {
        //     optionElement.classList.add('selected');
        //     optionElement.setAttribute('aria-pressed', 'true');
        // }

        // optionElement.addEventListener('click', () => selectOption(index));

        optionsContainer.appendChild(optionElement)
    })

    updateProgressBar()
}

function selectOption() {
    if(!isQuizActive) return;

    

}

function handleNext() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
    updateUI();
}

function handlePrev() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
    updateUI();
}

function updateUI() {
    // Button states
    prevBtn.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = 'Finish';
        nextBtn.classList.add('btn-success');
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.classList.remove('btn-success');
    }

    // update live score (optional based on answered question so far)
    const currentScore = calculateScore();
    currentScoreDisplay.textContent = currentScore;
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateQuestionNumber() {
    questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1}/${quizData.length}`
}

function calculateScore() {
    let tempScore = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && answer === quizData[index].correctAnswer) {
            tempScore++;
        }
    });
    return tempScore;
}

function endQuiz(timeRanOut = false) {
    isQuizActive = false;
    clearInterval(timerInterval);

    score = calculateScore();

    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    finalScoreDisplay.textContent = score;
    totalScoreDisplay.textContent = quizData.length;

    if (timeRanOut) {
        feedBackMessage.textContent = "Time's up! Here is your result"
    } else {
        const percentage = (score / quizData.length) * 100;

        // Remove prevoius tada class if any
        resultContainer.classList.remove('tada');

        if (score === quizData.length) {
            feedBackMessage.textContent = "Perfect! You got all questions right!";
            feedBackMessage.style.color = "var(--success-color)";


            // Trigger confetti

            if (typeof window.confett === 'function') {
                window.confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                })
            }

            // Add tada animation
            resultContainer.classList.add('tada');
        } else if (percentage >= 80) {
            feedBackMessage.textContent = "Excellent! You have a great understanding.";
            feedBackMessage.style.color = "var(--success-color)";
        } else if (percentage >= 50) {
            feedBackMessage.textContent = "Good job! But there's room for improvement.";
            feedBackMessage.style.color = "orange";
        } else {
            feedBackMessage.textContent = "Keep practicing! You'll get better.";
            feedBackMessage.style.color = "var(--error-color)";
        }
    }

}


init();