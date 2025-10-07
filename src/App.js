import './App.css';
import HomePage from "./pages/Homepage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSignup from "./pages/StudentSignup";
// import StudentLogin from "./pages/StudentLogin";
// import Jobs from "./pages/Jobs"; // create this component
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<StudentLogin />} /> */}
        <Route path="/signup" element={<StudentSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
