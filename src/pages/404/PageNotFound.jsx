import React from "react";
import { MainLayout } from "../../layouts";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleClickOnHome = () => {
    navigate("/");
  };
  return (
    <MainLayout>
      <Typography component="h1" variant="h5" sx={{ paddingY: 2 }}>
        Page Not Found - Back to Home
      </Typography>

      <IconButton
        aria-label="Back Home video quiz"
        size="lg"
        variant="solid"
        color="neutral"
        sx={{
          borderRadius: "50%",
        }}
        onClick={handleClickOnHome}
      >
        <HomeIcon />
      </IconButton>
    </MainLayout>
  );
};

export default PageNotFound;
