import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PhotoCapture from './pages/PhotoCapture';
import MeasurementsResultsDisplay from './pages/MeasurementsResultsDisplay'
import { MeasurementProvider } from './context/MeasurementsContext';

function App() {
  return (
    <MeasurementProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/photoCapture" element={<PhotoCapture></PhotoCapture>}></Route>
          <Route path="/resultsDisplay" element={<MeasurementsResultsDisplay></MeasurementsResultsDisplay>}></Route>
        </Routes>
      </Router>
    </MeasurementProvider>
  );
}

export default App;
