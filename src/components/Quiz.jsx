import { useState } from "react";
import quizesData from "../data/quizes.json";
import QuizGame from "./QuizGame";

function Quiz() {
  const [quizSelected, setQuizSelected] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  function openQuiz(quiz) {
    const generatedQuiz = generateQuiz(quiz);
    setSelectedQuiz(generatedQuiz);
    setQuizSelected(true);
    console.log(generatedQuiz);
  }

  function generateNewQuiz(quizKey) {
    const quiz = quizesData.quizzes.find((q) => q.key === quizKey);
    openQuiz(quiz);
  }

  function generateQuiz(quiz) {
    const easyQuestions = quiz.questions.filter(
      (question) => question.difficulty === "easy",
    );
    const hardQuestions = quiz.questions.filter(
      (question) => question.difficulty === "hard",
    );
    const selectedEasyQuestions = getRandomQuestions(easyQuestions, 7);
    const selectedHardQuestions = getRandomQuestions(hardQuestions, 2);
    return {
      ...quiz,
      questions: [...selectedEasyQuestions, ...selectedHardQuestions],
    };
  }

  function getRandomQuestions(questions, count) {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function closeQuiz() {
    setQuizSelected(false);
    setSelectedQuiz(null);
  }

  return (
    <div className="max-w-336 mx-auto bg-white my-3 p-6">
      {!quizSelected && (
        <div className="p-6 xl:px-0">
          <h1 className="text-[40px]/[1.125] font-bold xl:text-[60px]">
            Viktoriinid
          </h1>
          <label
            htmlFor="quiz"
            className="block text-sm font-medium text-gray-700 mt-6"
          >
            Vali viktoriin
          </label>
          <ul className="mt-2 text-sm text-gray-500">
            {quizesData.quizzes.map((quiz) => (
              <li
                key={quiz.key}
                className="cursor-pointer hover:text-gray-600 flex items-center text-black my-2"
                onClick={() => {
                  openQuiz(quiz);
                }}
              >
                <svg className="w-[18px] h-[18px]">
                  <use href="/src/assets/icons.svg#arrow-link"></use>
                </svg>
                <span className="ml-2 font-bold text-[16px]">{quiz.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {quizSelected && (
        <div className="p-6 xl:px-0 min-h-125">
          <QuizGame
            quiz={selectedQuiz}
            generateNewQuiz={generateNewQuiz}
            closeQuiz={closeQuiz}
          />
        </div>
      )}
    </div>
  );
}

export default Quiz;
