import { useEffect, useState } from "react";
import { quizzes as globalQuizzes } from "./../mocks";
const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState(
    JSON.parse(localStorage.getItem("quizzes")) || globalQuizzes
  );

  useEffect(() => {
    const storedQuizzes = localStorage.getItem("quizzes");
    if (storedQuizzes && storedQuizzes.length > 0) {
      setQuizzes(JSON.parse(storedQuizzes));
    } else {
      setQuizzes(globalQuizzes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const setQuiz = (newQuiz) => {
    const updatedQuizzes = quizzes.map((quiz) => {
      if (quiz.id === newQuiz.id) {
        return newQuiz;
      } else {
        return quiz;
      }
    });
    setQuizzes(updatedQuizzes);
  };

  return [quizzes, setQuiz];
};

export default useQuizzes;
