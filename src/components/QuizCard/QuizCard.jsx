import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <Card variant="outlined" sx={{ width: 245 }}>
      <CardOverflow>
        <AspectRatio ratio="3/4">
          <video src={quiz.url} />
        </AspectRatio>
        <IconButton
          aria-label="Play video quiz"
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
          onClick={handleClick}
        >
          <PlayArrowIcon />
        </IconButton>
      </CardOverflow>

      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 3,
        }}
        onClick={handleClick}
      >
        <Typography
          level="body2"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          {quiz.question}
        </Typography>
      </CardOverflow>
    </Card>
  );
};
export default QuizCard;
