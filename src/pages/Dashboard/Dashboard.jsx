import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Grid } from "@mui/joy";
import { QuizCard } from "../../components";
import { MainLayout } from "../../layouts";
import useQuizzes from "../../hooks/useQuizzes";

const Dashboard = () => {
  const [currentQuizzes, setQuiz] = useQuizzes();
  const [isDisabled, setIsDisabled] = useState(true);
  const handleClick = () => {
    console.log("Quizzes ", currentQuizzes);
  };
  useEffect(() => {
    let allCompleted = true;
    currentQuizzes.forEach((quiz) => {
      if (quiz.completed === false) allCompleted = false;
    });

    allCompleted ? setIsDisabled(false) : setIsDisabled(true);
  }, []);
  return (
    <MainLayout>
      <Typography component="h1" variant="h3" sx={{ paddingY: 2 }}>
        Video Quiz
      </Typography>

      <Grid container spacing={4} sx={{ flexGrow: 1 }}>
        {currentQuizzes.map((quiz) => (
          <Grid key={quiz.id} xs={12} sm={6} md={3}>
            <QuizCard key={quiz.id} quiz={quiz} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginY: 2 }}
          onClick={handleClick}
          disabled={isDisabled}
        >
          ENVIAR
        </Button>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
