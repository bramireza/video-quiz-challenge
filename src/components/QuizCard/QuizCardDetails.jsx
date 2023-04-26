import React, { useState, useEffect, useRef } from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useWebRTC } from "../../hooks/useWebRTC";

const QuizCardDetails = ({ quiz, setQuiz }) => {
  const [isRecorded, setIsRecorded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showStream, setShowStream] = useState(true);
  const [url, setURL] = useState(quiz.url);

  const videoRef = useRef(null);
  const videoRecordRef = useRef(null);

  const { init, startRecording, stopRecording, resetRecording } = useWebRTC(
    setURL,
    setQuiz,
    setErrorMsg
  );

  useEffect(() => {
    if (quiz.completed) {
      setIsRecorded(true);
      setShowStream(false);
      console.log("is completed");
    } else {
      console.log("no completed", url);
      resetRecording(videoRef, setIsRecorded);
    }
    console.log(quiz);
    init(videoRef);
  }, [quiz.completed]);
  const handleRecordingButtonClick = () => {
    if (isRecording) {
      stopRecording(setIsRecording);
      setShowStream(false);
    } else {
      startRecording(setIsRecording);
      setShowStream(true);
    }
  };
  return (
    <Card variant="outlined" sx={{ width: 700 }}>
      <CardOverflow>
        <AspectRatio ratio="4/3">
          {errorMsg && <p>{errorMsg}</p>}

          <video
            playsInline
            ref={videoRecordRef}
            src={url}
            controls
            hidden={showStream}
            style={{ width: "100%" }}
          />

          <video
            autoPlay
            playsInline
            ref={videoRef}
            muted
            hidden={!showStream}
            style={{ width: "100%" }}
          />
        </AspectRatio>
        <IconButton
          aria-label="Action video quiz"
          size="lg"
          variant="solid"
          color="neutral"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            left: "1rem",
            bottom: "1rem",
          }}
          onClick={handleRecordingButtonClick}
        >
          {isRecording ? (
            <StopIcon />
          ) : isRecorded ? (
            <RestartAltIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </IconButton>
      </CardOverflow>

      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 3,
        }}
      >
        <Typography
          level="body2"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          {quiz?.question}
        </Typography>
      </CardOverflow>
    </Card>
  );
};

export default QuizCardDetails;
