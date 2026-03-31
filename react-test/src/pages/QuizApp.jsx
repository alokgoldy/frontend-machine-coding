import { useState, useMemo } from 'react';
import '../styles/quiz-app.css'

function QuizOption({ option, answer, setAnswer }) {

  const onChange = ({ target: { value } }) => setAnswer(value)
  return (
    <label>
      <input
        type='radio'
        value={option}
        checked={option === answer}
        name="answers"
        onChange={onChange}
      />
      {option}
    </label>
  )
}

function QuizApp() {

  const questions = useMemo(() => [{
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correct: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
    correct: "Berlin",
  }], []);

  const questionsTotal = useMemo(() => questions.length, [questions]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState(null)
  const [answer, setAnswer] = useState(null);
  const [completedQuiz, setCompletedQuiz] = useState(false);


  const submit = () => {
    if (!answer) return;

    if (answer === questions[questionIndex].correct) {
      setScore(prev => prev + 1);
      setFeedback("Correct!")
    } else {
      setFeedback("Incorrect!")
    }

    if (questionIndex === questionsTotal - 1) {
      setCompletedQuiz(true);
    } else {
      setAnswer(null);
      setQuestionIndex(prev => prev + 1);
    }
  }
  const restart = () => {
    setQuestionIndex(0)
    setScore(0)
    setFeedback(null)
    setAnswer(null)
    setCompletedQuiz(false)
  }

  return (
    <section className='quiz-page'>
      <div className='quiz-container'>
        <div id='question' className='quiz-question'>
          {`${questions[questionIndex].question}`}
        </div>
        <div className='quiz-options'>
          {questions[questionIndex].options.map((option, index) => (
            <QuizOption
              key={`option-${index}`}
              option={option}
              answer={answer}
              setAnswer={setAnswer}
            />
          ))}
        </div>
        <button
          disabled={completedQuiz || !answer}
          className="quiz-button"
          id="submitBtn"
          onClick={submit}
        >
          Submit
        </button>
        <div id='feedBack' className="quiz-feedback">
          {feedback && !completedQuiz && feedback}
        </div>
        <div id='score' className='quiz-score'>
          {completedQuiz &&
            `Quiz complete! You scored ${score} out of ${questions.length}!`}
        </div>
        {completedQuiz && (
          <button className="quiz-button" onClick={restart}>
            Restart
          </button>
        )}
      </div>
    </section>
  )
}

export default QuizApp;
