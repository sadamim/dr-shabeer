"use client";

import { useState, useEffect, useRef } from 'react';
import confetti from "canvas-confetti";

const quizData = [
  {
    question: "Which of these is a common symptom of GERD?",
    options: ["Hair Loss", "Heartburn", "Blurry Vision", "Itching"],
    answer: "Heartburn"
  },
  {
    question: "What is the function of the large intestine?",
    options: ["Blood circulation", "Oxygen exchange", "Water absorption", "Hormone production"],
    answer: "Water absorption"
  },
  {
    question: "Which nutrient helps in wound healing?",
    options: ["Vitamin C", "Calcium", "Iron", "Sodium"],
    answer: "Vitamin C"
  },
  {
    question: "When should you consult a doctor for abdominal pain?",
    options: ["After 3 weeks", "Only if there's nausea", "If it’s persistent or severe", "Never"],
    answer: "If it’s persistent or severe"
  }
];

export default function HealthQuizPage() {
  const [current, setCurrent] = useState(0);
const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Ref to prevent multiple confetti triggers
  const confettiFired = useRef(false);

  useEffect(() => {
    if (showResult && !confettiFired.current) {
      confettiFired.current = true;
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
    if (!showResult) {
      confettiFired.current = false;
    }
  }, [showResult]);

  const handleNext = () => {
    if (selected === quizData[current].answer) {
      setScore(score + 1);
    }
    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="new-quiz-style">
      {/* Health-themed SVG background */}
      <div className="quiz-bg-svg">
        {/* Example SVG: you can add more icons or change colors as you wish */}
        <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="120" fill="#eaf4fc" opacity="0.5"/>
          <circle cx="1300" cy="150" r="80" fill="#d0f5e8" opacity="0.4"/>
          <rect x="1100" y="600" width="180" height="180" rx="40" fill="#f9e7ef" opacity="0.3"/>
          <g opacity="0.15">
            <text x="100" y="800" fontSize="120" fontWeight="bold" fill="#1bbd7e">🩺</text>
            <text x="1200" y="850" fontSize="100" fontWeight="bold" fill="#007bff">💊</text>
            <text x="700" y="100" fontSize="90" fontWeight="bold" fill="#f9b115">🧬</text>
            <text x="400" y="600" fontSize="110" fontWeight="bold" fill="#e63946">❤️</text>
          </g>
        </svg>
      </div>
      <div className="quiz-outer-flex">
        <div className="doctor-img-col">
          <img
            src="/img/Doctor_svg.png"
            alt="Doctor"
            className="doctor-side-img"
            draggable={false}
          />
        </div>
        <div className="quiz-main-col">
          <h1 className="page-title d-none">Dr Shabeer Ahmed Quizzes</h1>

          <h2 className="quiz-title">🧠Health Awareness Quiz</h2>

          {showResult ? (
            <div className="quiz-result">
              <h3>Your Score: {score} / {quizData.length}</h3>
              <p>{score === quizData.length ? "🎉 Excellent! You’re very aware." : "📘 Keep learning for better health!"}</p>
              <button className="btn restart-btn" onClick={restartQuiz}>Try Again</button>
            </div>
          ) : (
            <div className="quiz-card">
              <h4 className="question">{quizData[current].question}</h4>
              <ul className="option-list">
                {quizData[current].options.map((option: any, i) => (
                  <li
                    key={i}
                    className={`option ${selected === option ? "selected" : ""}`}
                    onClick={() => setSelected(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <button className="btn next-btn" disabled={!selected} onClick={handleNext}>
                {current + 1 === quizData.length ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
