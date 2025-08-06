import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const HomePage = () => {
  const navigate = useNavigate();

  /**
   * Go to PhotocapturePage
   */
  const goToPhotoCapture = () => {
    // Navigate to the Users List Page
    navigate("/photoCapture");
  };

  return (
    <div>
      <h2>HomePage</h2>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={goToPhotoCapture}
      >
        Incarcare Poze
      </Button>
    </div>
  );
};

export default HomePage;
