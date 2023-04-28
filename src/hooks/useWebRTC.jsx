import React, { useRef, useEffect, useState } from "react";
import { constraints, mimeType } from "../mocks";

export const useWebRTC = (setURL, setQuiz, setErrorMsg) => {
  let chunks = [];
  const mediaRecorderRef = useRef(null);
  const handleError = (error) => {
    setErrorMsg(`Error: ${error.toString()}`);
  };
  const init = async (videoRef) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      window.stream = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      handleError(error);
    }
  };
  const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      chunks.push(event.data);
    }
  };
  const startRecording = (setIsRecording) => {
    try {
      chunks = [];
      setQuiz((prevQuiz) => ({ ...prevQuiz, completed: false }));
      mediaRecorderRef.current = new MediaRecorder(window.stream, {
        mimeType: mimeType,
      });
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      handleError(error);
    }
  };
  const stopRecording = (setIsRecording) => {
    try {
      mediaRecorderRef.current.stop();

      setIsRecording(false);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (mediaRecorderRef.current) {
      chunks = [];
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(chunks, { type: mimeType });
        const url = window.URL.createObjectURL(videoBlob);
        setURL(url);
        setQuiz((prevQuiz) => ({ ...prevQuiz, completed: true, url: url }));
      };
      console.log(mediaRecorderRef.current);
    }
  }, [mediaRecorderRef.current]);
  const resetRecording = (videoRef, setIsRecorded) => {
    try {
      chunks = [];
      setIsRecorded(false);
      setQuiz((prevQuiz) => ({ ...prevQuiz, completed: false }));

      init(videoRef);
    } catch (error) {
      handleError(error);
    }
  };
  return {
    init,
    startRecording,
    stopRecording,
    resetRecording,
  };
};
