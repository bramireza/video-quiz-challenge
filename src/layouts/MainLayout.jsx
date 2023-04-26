import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";

export const MainLayout = ({ children }) => {
  return (
    <Container component="main">
      <Box className="app-content">
        <Box
          className="content-center"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Card sx={{ zIndex: 1, boxShadow: "none" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {children}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
