import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Quiz.css";
import { data } from "./QuizData";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const question = data[index];
  const handleAnswer = (celebrity) => {
    setAnswers((prev) => [...prev, celebrity]);
    if (index < data.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      calculateResult([...answers, celebrity]);
    }
  };

  const calculateResult = (finalAnswers) => {
    const counts = finalAnswers.reduce((acc, celeb) => {
      acc[celeb] = (acc[celeb] || 0) + 1;
      return acc;
    }, {});
    const topCelebrity = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b,
    );
    setResult(topCelebrity);
  };

  const handleRestart = () => {
    setIndex(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="result-screen">
        <h2>Your style match is:</h2>
        <h1>{result}</h1>
        <button onClick={handleRestart}>Restart Quiz</button>
        <Link to="/" className="result-return-link">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="quiz-background"></section>
      <div className="pop-up">
        <h2>Find Your Style!</h2>
        <h3>
          {index + 1}. {question.question}
        </h3>
        <ul>
          <li onClick={() => handleAnswer(question.option1Celeb)}>
            {question.option1}
          </li>
          <li onClick={() => handleAnswer(question.option2Celeb)}>
            {question.option2}
          </li>
          <li onClick={() => handleAnswer(question.option3Celeb)}>
            {question.option3}
          </li>
          <li onClick={() => handleAnswer(question.option4Celeb)}>
            {question.option4}
          </li>
        </ul>
        <section className="index">
          {index + 1} of {data.length}
        </section>
        <Link to="/" className="return-link">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default Quiz;
