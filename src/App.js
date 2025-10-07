import './App.css';
import HomePage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import OwnerDashboard from './pages/OwnerDashboard/OwnerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard/*" element={<OwnerDashboard />} />
      {/* Placeholder routes (you can replace with real pages later) */}
      <Route path="/jobs" element={<div>Jobs Page</div>} />
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/signup" element={<div>Signup Page</div>} />
    </Routes>
  );
}

export default App;
