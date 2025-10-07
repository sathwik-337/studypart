import './App.css';
import HomePage from "./pages/Homepage";
import StudentDashboard from "./pages/StudentDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* Placeholder routes (you can replace with real pages later) */}
        <Route path="/jobs" element={<div>Jobs Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/signup" element={<div>Signup Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
