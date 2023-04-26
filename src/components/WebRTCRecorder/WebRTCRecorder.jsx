import React, { useState, useEffect } from "react";

const WebRTCRecorder = () => {
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const startRecording = () => {
    if (recorder && !recording) {
      recorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (recorder && recording) {
      recorder.stop();
      setRecording(false);
    }
  };

  const handleSuccess = (stream) => {
    setStream(stream);
    setRecorder(new MediaRecorder(stream));
  };

  const handleError = (error) => {
    setErrorMsg(`Error: ${error.toString()}`);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(handleSuccess)
      .catch(handleError);
  }, []);

  useEffect(() => {
    if (recorder) {
      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        const url = window.URL.createObjectURL(videoBlob);
        setVideoURL(url);
      };
    }
  }, [recorder]);

  return (
    <div>
      {errorMsg && <p>{errorMsg}</p>}
      <video src={videoURL} controls />
      <button onClick={startRecording} disabled={!stream || recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
    </div>
  );
};

export default WebRTCRecorder;
