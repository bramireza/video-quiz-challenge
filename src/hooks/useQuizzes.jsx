import { useEffect, useState } from "react";

const useQuizzes = (quizzes) => {
  const [currentQuizzes, setCurrentQuizzes] = useState([]);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
    if (storedQuizzes && storedQuizzes.length > 0) {
      setCurrentQuizzes(storedQuizzes);
    } else {
      setCurrentQuizzes(quizzes);
    }
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(currentQuizzes));
  }, [currentQuizzes]);

  const setQuiz = (newQuiz) => {
    const updatedQuizzes = currentQuizzes.map((quiz) => {
      if (quiz.id === newQuiz.id) {
        return newQuiz;
      } else {
        return quiz;
      }
    });
    setCurrentQuizzes(updatedQuizzes);
  };

  return [currentQuizzes, setQuiz];
};

export default useQuizzes;
