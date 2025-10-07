import './App.css';
import HomePage from "./pages/Homepage";
import { Routes, Route, useNavigate } from "react-router-dom";
import OwnerDashboard from './pages/OwnerDashboard';
import StudentDashboardUnified from "./pages/StudentDashboardUnified";
import StudentSignup from "./pages/StudentSignup";

import AuthForm from "./pages/Authform";

import AdminDashboard from "./pages/AdminDashboard";

const AuthWithBack = () => {
  const navigate = useNavigate();
  return <AuthForm onBack={() => navigate('/')} />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/owner-dashboard/*" element={<OwnerDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboardUnified />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/signup" element={<StudentSignup />} />
      <Route path="/auth" element={<AuthWithBack />} />

      {/* Placeholder routes (you can replace with real pages later) */}
      <Route path="/jobs" element={<div>Jobs Page</div>} />
      <Route path="/login" element={<div>Login Page</div>} />
      
    </Routes>
  );
}

export default App;
