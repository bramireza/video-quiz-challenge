import React from "react";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { QuizCard } from "../../components";
import { quizzes } from "../../mocks";
import { MainLayout } from "../../layouts";
import useQuizzes from "../../hooks/useQuizzes";
import { Grid } from "@mui/joy";

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

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {currentQuizzes.map((quiz) => (
          <Grid xs={6} sm={6} md={3}>
            <QuizCard key={quiz.id} quiz={quiz} />
          </Grid>
        ))}
      </Grid>
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
