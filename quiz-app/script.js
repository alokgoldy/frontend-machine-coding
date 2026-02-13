import { quizData } from './data.js';

// Configuration
const QUIZ_DURATION_SECONDS = 60 * 2; // 2 minutes

// State
let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.length).fill(null);
let score = 0;
let timerInterval;
let timeLeft = QUIZ_DURATION_SECONDS;
let isQuizActive = false;

// DOM Elements
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const questionNumberDisplay = document.getElementById('question-number');
const currentScoreDisplay = document.getElementById('current-score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const finalScoreDisplay = document.getElementById('final-score');
const totalScoreDisplay = document.getElementById('total-score');
const feedbackMessage = document.getElementById('feedback-message');
const restartBtn = document.getElementById('restart-btn');

// Initialization
function init() {
    startQuiz();
    setupEventListeners();
}

function startQuiz() {
    isQuizActive = true;
    currentQuestionIndex = 0;
    userAnswers = new Array(quizData.length).fill(null);
    score = 0;
    timeLeft = QUIZ_DURATION_SECONDS;
    
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    
    startTimer();
    loadQuestion();
    updateUI();
}

function setupEventListeners() {
    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);
    restartBtn.addEventListener('click', startQuiz);
    
    // Keyboard navigation for options
    optionsContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target;
            if (target.classList.contains('option')) {
                const index = parseInt(target.dataset.index);
                selectOption(index);
            }
        }
    });
}

function startTimer() {
    clearInterval(timerInterval);
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            endQuiz(true); // true indicates time ran out
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
        optionElement.tabIndex = 0; // Make focusable
        optionElement.setAttribute('role', 'button');
        optionElement.setAttribute('aria-pressed', 'false');
        
        // Check if previously selected
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
            optionElement.setAttribute('aria-pressed', 'true');
        }
        
        optionElement.addEventListener('click', () => selectOption(index));
        
        optionsContainer.appendChild(optionElement);
    });
    
    updateProgressBar();
    updateQuestionNumber();
}

function selectOption(index) {
    if (!isQuizActive) return;

    userAnswers[currentQuestionIndex] = index;
    
    // Update UI
    const options = optionsContainer.children;
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
        options[i].setAttribute('aria-pressed', 'false');
        if (i === index) {
            options[i].classList.add('selected');
            options[i].setAttribute('aria-pressed', 'true');
        }
    }
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
    
    // Update live score (optional, based on answered questions so far)
    const currentScore = calculateScore();
    currentScoreDisplay.textContent = currentScore;
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateQuestionNumber() {
    questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1}/${quizData.length}`;
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
        feedbackMessage.textContent = "Time's up! Here is your result.";
    } else {
        const percentage = (score / quizData.length) * 100;
        if (percentage >= 80) {
            feedbackMessage.textContent = "Excellent! You have a great understanding.";
            feedbackMessage.style.color = "var(--success-color)";
        } else if (percentage >= 50) {
            feedbackMessage.textContent = "Good job! But there's room for improvement.";
            feedbackMessage.style.color = "orange";
        } else {
            feedbackMessage.textContent = "Keep practicing! You'll get better.";
            feedbackMessage.style.color = "var(--error-color)";
        }
    }
}

// Start the app
init();
