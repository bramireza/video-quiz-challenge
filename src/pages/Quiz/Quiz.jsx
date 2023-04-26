import React, { useState, useEffect } from "react";
import { QuizCardDetails } from "../../components";
import { Box, Button, IconButton } from "@mui/material";
import { quizzes } from "../../mocks";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../../layouts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import useQuizzes from "../../hooks/useQuizzes";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});
  const [currentQuizzes, editQuiz] = useQuizzes();
  useEffect(() => {
    console.log(currentQuizzes);
    const currentQuiz = quizzes.find((quiz) => quiz.id == parseInt(id));
    if (currentQuiz) {
      setQuiz(currentQuiz);
    } else {
      navigate("/404/");
    }
  }, [id]);
  const handleClickOnHome = () => {
    navigate("/");
  };
  const handleClickOnBack = () => {
    navigate(`/quiz/${parseInt(id) - 1}`);
  };
  const handleClickOnNext = () => {
    navigate(`/quiz/${parseInt(id) + 1}`);
  };
  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
        }}
      >
        <IconButton
          aria-label="Back video quiz"
          size="lg"
          variant="solid"
          color="neutral"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            left: "1rem",
            top: 15,
          }}
          onClick={handleClickOnHome}
        >
          <HomeIcon />
        </IconButton>
        <QuizCardDetails quiz={quiz} setQuiz={setQuiz} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          aria-label="Back video quiz"
          size="lg"
          variant="solid"
          color="neutral"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            left: "1rem",
            bottom: 15,
          }}
          onClick={handleClickOnBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          aria-label="Next video quiz"
          size="lg"
          variant="solid"
          color="neutral"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 15,
          }}
          onClick={handleClickOnNext}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </MainLayout>
  );
};

export default Quiz;
