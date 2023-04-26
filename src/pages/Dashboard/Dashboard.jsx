import React from "react";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { QuizCard } from "../../components";
import { quizzes } from "../../mocks";
import { MainLayout } from "../../layouts";
import useQuizzes from "../../hooks/useQuizzes";

const Dashboard = () => {
  const [currentQuizzes, setQuiz] = useQuizzes(quizzes);
  const handleClick = () => {
    console.log("Quizzes ", currentQuizzes);
  };
  return (
    <MainLayout>
      <Typography component="h1" variant="h3" sx={{ paddingY: 2 }}>
        Video Quiz
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
        }}
      >
        {currentQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginLeft: "auto" }}
          onClick={handleClick}
        >
          ENVIAR
        </Button>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
