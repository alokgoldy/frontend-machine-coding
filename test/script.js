import { quizData } from './data.js'

// configuration

const QUIZ_DURATION_SECONDS = 60 * 2; // 2 minutes



//state
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = QUIZ_DURATION_SECONDS;

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

function handleNext() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        console.log('hi')
        // endQuiz();
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

init();