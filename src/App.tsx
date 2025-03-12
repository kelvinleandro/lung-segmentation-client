import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import SegmentationPage from "./pages/segmentation";
// import TestPage from "./pages/test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/segmentation" element={<SegmentationPage />} />
        {/* <Route path="/test" element={<TestPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
