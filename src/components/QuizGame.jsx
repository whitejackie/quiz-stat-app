import { useState } from "react";
import Button from "./Button";
import ResultsTable from "./ResultsTable";
import Feedback from "./Feedback";

function QuizGame({ quiz, generateNewQuiz, closeQuiz }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [userResponses, setUserResponses] = useState([]);

  const quizLength = quiz.questions.length;

  function selectOption(option) {
    setSelectedOption(option);
    if (option === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(
        score +
          (quiz.questions[currentQuestionIndex].difficulty === "easy"
            ? 10
            : 15),
      );
    }
    setUserResponses([
      ...userResponses,
      {
        question: quiz.questions[currentQuestionIndex].question,
        selectedOption: option,
        correctAnswer:
          quiz.questions[currentQuestionIndex].correctAnswer === option,
      },
    ]);
  }

  function nextQuestion() {
    setSelectedOption(null);
    if (currentQuestionIndex < quizLength - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  }

  function restartQuiz() {
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setUserResponses([]);
    generateNewQuiz(quiz.key);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1
          className="text-[40px]/[1.125] font-bold xl:text-[60px]"
          data-testid="quiz-title"
        >
          {quiz.title}
        </h1>
        {!quizFinished && (
          <svg
            className="w-8 h-8 cursor-pointer"
            onClick={() => closeQuiz()}
            data-testid="close-quiz"
          >
            <use href="/icons.svg#close"></use>
          </svg>
        )}
      </div>
      <div className="max-w-175 mx-auto my-5">
        {!quizStarted && (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-center p-5">{quiz.description}</p>
            <Button
              onClick={() => setQuizStarted(true)}
              type="primary"
              data-testid="start-quiz"
            >
              Alusta viktoriini
            </Button>
          </div>
        )}
        {quizStarted && !quizFinished && (
          <>
            <div className="flex justify-between mb-2">
              <p>
                Küsimus {currentQuestionIndex + 1} / {quizLength}
              </p>
              <p>Punktid: {score}</p>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 mb-3">
              <div
                className="h-full rounded-full bg-black transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / quizLength) * 100}%`,
                }}
              />
            </div>
            <p className="mb-2 font-bold" data-testid="question-text">
              {quiz.questions[currentQuestionIndex].question}
            </p>
            <div className="flex flex-col">
              {quiz.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <div
                    key={index}
                    data-testid={`option-${index}`}
                    className={`border p-2 mb-2 flex justify-between
                        ${selectedOption ? "disabled" : "hover:bg-gray-200 cursor-pointer "}
                        ${selectedOption !== option ? "bg-white" : selectedOption === quiz.questions[currentQuestionIndex].correctAnswer ? "bg-green-200" : "bg-red-300"}
                        `}
                    onClick={() => !selectedOption && selectOption(option)}
                  >
                    <p>{option}</p>
                    {selectedOption === option &&
                      (selectedOption ===
                      quiz.questions[currentQuestionIndex].correctAnswer ? (
                        <div
                          className="flex"
                          data-testid="answer-feedback-correct"
                        >
                          <p>Õige vastus!</p>
                          <svg className="w-5 h-5 m-0.5">
                            <use href="/icons.svg#success"></use>
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="flex"
                          data-testid="answer-feedback-wrong"
                        >
                          <p>Vale vastus!</p>
                          <svg className="w-5 h-5 m-0.5">
                            <use href="/icons.svg#error"></use>
                          </svg>
                        </div>
                      ))}
                  </div>
                ),
              )}
            </div>
            {selectedOption && (
              <Button
                onClick={() => nextQuestion()}
                type="primary"
                data-testid="next-question"
              >
                {currentQuestionIndex === quizLength - 1
                  ? "Vaata tulemusi"
                  : "Järgmine küsimus"}
              </Button>
            )}
          </>
        )}
        {quizFinished && (
          <div
            className="flex flex-col items-center gap-1"
            data-testid="quiz-results"
          >
            <p>Viktoriin lõppenud!</p>
            <Feedback score={score} feedback={quiz.feedback} />
            <ResultsTable userResponses={userResponses} />
            <div className="flex gap-2 mt-4 md:flex-row flex-col items-center">
              <Button
                onClick={() => restartQuiz()}
                type="primary"
                data-testid="restart-quiz"
              >
                Mängi uuesti
              </Button>
              <Button
                onClick={() => closeQuiz()}
                type="secondary"
                data-testid="choose-another-quiz"
              >
                Vali teine viktoriin
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default QuizGame;
