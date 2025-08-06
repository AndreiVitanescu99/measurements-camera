import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import measurementsData from "../data/data-test/measurements.json";
import resultsData from "../data/data-test/results.json";

const MeasurementsResultsDisplay = () => {
  const navigate = useNavigate();

  /**
   * Go to HomePage
   */
  const goToHome = () => {
    navigate("/");
  };

  const getMatchingResultsForMeasurement = (measurement) => {
    const resultIds = measurement.results;
    const flattenedResults = resultsData.results.flat();
    return flattenedResults.filter((resultObj) =>
      resultIds.includes(resultObj.id)
    );
  };

  const firstMeasurement = measurementsData.measurements[0];
  const matchedResults = getMatchingResultsForMeasurement(firstMeasurement);

  return (
    <div style={{ padding: 20 }}>
      <h2>Results for Measurement</h2>

      {matchedResults.map((result) => (
        <Card key={result.id} sx={{ mb: 2, maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {result.productId?.name || "No Product Name"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Recommended by:</strong> {result.recommendedBy || "-"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Collection:</strong> {result.collectionId || "-"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Size:</strong> {result.size || "-"}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={goToHome}
        sx={{ mb: 2 }}
      >
        HomePage
      </Button>
    </div>
  );
};

export default MeasurementsResultsDisplay;
