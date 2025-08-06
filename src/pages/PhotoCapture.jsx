import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import UserSelect from "../components/UserSelect";
import Stack from "@mui/material/Stack";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PhotoCapture = () => {
  const navigate = useNavigate();
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  console.log("isMobile: " + isMobile);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  //---- Refs for the pfhoto part, with open camera ----//
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const videoContainerRef = useRef(null);
  //----------------------------------------------------//

  /**
   * Manage the change of the selected user
   * @param {Object} event
   */
  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * When uploading the photo, we only set the file to state if the user has selected
   * @param {Object} event
   * @returns
   */
  const handleFileChange = (event) => {
    if (!selectedUserId) return;

    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log("Fișier încărcat pentru user:", selectedUserId, file);
    }
  };

  /**
   * Open the device camera
   * @returns
   */
  const openCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Camera API not supported in this browser/environment.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      if (videoContainerRef.current) {
        videoContainerRef.current.style.display = "block";
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera access denied or not available.");
    }
  };

  /**
   * Capture an image from the current video stream and draw it on a canvas
   */
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataURL = canvas.toDataURL("image/png");
      console.log("Captured Image:", imageDataURL);

      // Hide camera after capture
      if (videoContainerRef.current) {
        videoContainerRef.current.style.display = "none";
      }

      // stop the video stream to free the camera
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
      }
    }
  };

  /**
   * Go to MeasurementsResultsDisplay
   */
  const goToMeasurements = () => {
    navigate("/resultsDisplay");
  };

  return (
    <div>
      <h2>PhotoCapture</h2>

      {/* List of users */}
      <UserSelect selectedId={selectedUserId} onChange={handleUserChange} />

      <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
        {!isMobile && (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
              textTransform: "none",
              pointerEvents: !selectedUserId ? "none" : "auto",
              opacity: !selectedUserId ? 0.5 : 1,
            }}
          >
            Upload Pictures
            <VisuallyHiddenInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        )}

        {/* {!isMobile && ( */}
        <Button
          variant="contained"
          startIcon={<CameraAltIcon />}
          sx={{ textTransform: "none" }}
          onClick={openCamera}
        >
          Take a picture
        </Button>
        {/* )} */}

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={goToMeasurements}
        >
          Measurements Results
        </Button>
      </Stack>

      <div ref={videoContainerRef} style={{ display: "none", marginTop: 20 }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", maxWidth: 400 }}
        />
        <br />
        <Button variant="contained" onClick={capturePhoto} sx={{ mt: 1 }}>
          Capture
        </Button>
        <canvas
          ref={canvasRef}
          style={{ display: "block", marginTop: 20, maxWidth: 400 }}
        />
      </div>
    </div>
  );
};

export default PhotoCapture;
