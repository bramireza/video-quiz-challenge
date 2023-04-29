import React, { useState, useEffect, useRef } from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { useWebRTC } from "../../hooks/useWebRTC";
import { limitTime } from "../../mocks";

const QuizCardDetails = ({ quiz, setQuiz }) => {
  const [isRecorded, setIsRecorded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showStream, setShowStream] = useState(true);
  const [time, setTime] = useState(0);

  const videoRef = useRef(null);
  const videoRecordRef = useRef(null);

  const { init, startRecording, stopRecording, resetRecording } = useWebRTC(
    setQuiz,
    setErrorMsg
  );

  useEffect(() => {
    if (quiz.completed) {
      setIsRecorded(true);
      setIsRecording(false);
      setShowStream(false);
    } else {
      setIsRecorded(false);
      setShowStream(true);
    }
    init(videoRef);
    console.log(quiz);
  }, [quiz.completed]);

  useEffect(() => {
    let intervalId;
    if (isRecording) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRecording]);

  useEffect(() => {
    if (time === limitTime) {
      stopRecording(setIsRecording);
      setShowStream(false);
    }
  }, [time]);

  const handleRecordingButtonClick = () => {
    isRecording
      ? (stopRecording(setIsRecording), setShowStream(false))
      : isRecorded
      ? (resetRecording(videoRef), setIsRecorded(false), setTime(0))
      : (startRecording(setIsRecording), setShowStream(true), setTime(0));
  };

  return (
    <Card variant="outlined" sx={{ width: 700 }}>
      <CardOverflow>
        {isRecording ? (
          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "1rem",
              right: "1rem",
              zIndex: 3,
              padding: "5px 8px",
              borderRadius: "20px",
              backgroundColor: "black",
              color: "red",
              width: "70px",
              animation: "blink 1s infinite",
            }}
          >
            <FiberManualRecordIcon className="blinking" />

            <Typography level="body2" sx={{ color: "white" }}>
              {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor(time % 60)
                .toString()
                .padStart(2, "0")}
            </Typography>
          </div>
        ) : (
          <></>
        )}
        <AspectRatio ratio="4/3">
          {errorMsg && <p>{errorMsg}</p>}

          <video
            playsInline
            ref={videoRecordRef}
            src={quiz.url}
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
