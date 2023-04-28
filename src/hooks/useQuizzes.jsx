import { useEffect, useState } from "react";
import { quizzes as globalQuizzes } from "./../mocks";

const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
    return storedQuizzes ? storedQuizzes : globalQuizzes;
  });

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const setQuiz = (newQuiz) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) => (quiz.id === newQuiz.id ? newQuiz : quiz))
    );
  };

  return [quizzes, setQuiz];
};

export default useQuizzes;
