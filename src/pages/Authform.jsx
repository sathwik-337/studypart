import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001'; // Replace with your Node.js backend URL

const AuthForm = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');
  const [colleges, setColleges] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    collegeId: '',
    studentCollegeId: '',
    organizationName: '',
    location: '',
    collegeIdPdf: null
  });

  useEffect(() => {
    fetchColleges();
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const fetchColleges = async () => {
    try {
      setLoadingColleges(true);
      const res = await axios.get(`${BACKEND_URL}/api/colleges`);
      setColleges(res.data);
    } catch (err) {
      console.error('Error fetching colleges:', err);
    } finally {
      setLoadingColleges(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, collegeIdPdf: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) await handleLogin();
      else await handleSignup();
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
        userType
      });
      setSuccess('Login successful!');
      setTimeout(() => onLogin(res.data.user), 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('userType', userType);

    if (userType === 'student') {
      if (!formData.dateOfBirth || !formData.collegeId || !formData.studentCollegeId || !formData.collegeIdPdf) {
        setError('All student fields are required including college ID PDF');
        return;
      }
      data.append('dateOfBirth', formData.dateOfBirth);
      data.append('collegeId', formData.collegeId);
      data.append('studentCollegeId', formData.studentCollegeId);
      data.append('collegeIdPdf', formData.collegeIdPdf);
    } else if (userType === 'owner') {
      if (!formData.organizationName) {
        setError('Organization name is required for owners');
        return;
      }
      data.append('organizationName', formData.organizationName);
      if (formData.location) data.append('location', formData.location);
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, data);
      setSuccess(res.data.message);
      if (userType === 'owner') {
        setTimeout(() => {
          setIsLogin(true);
          setError('');
          setSuccess('');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  if (!isLoaded) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {onBack && <button onClick={onBack} style={styles.backButton}>← Back</button>}
      <div style={styles.authCard}>
        <h2 style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>

        <div style={styles.userTypeSelector}>
          {['student', 'owner', 'admin'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              style={{
                ...styles.userTypeButton,
                ...(userType === type ? styles.userTypeButtonActive : {})
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} style={styles.input} required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} style={styles.input} required />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} style={styles.input} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} style={styles.input} required />

          {!isLogin && userType === 'student' && (
            <>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} style={styles.input} required />
              <input type="text" name="studentCollegeId" placeholder="Student ID" value={formData.studentCollegeId} onChange={handleInputChange} style={styles.input} required />
              <select name="collegeId" value={formData.collegeId} onChange={handleInputChange} style={styles.input} required>
                <option value="">Select College</option>
                {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input type="file" accept=".pdf" onChange={handleFileChange} style={styles.input} required />
            </>
          )}

          {!isLogin && userType === 'owner' && (
            <>
              <input type="text" name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleInputChange} style={styles.input} required />
              <input type="text" name="location" placeholder="Location (optional)" value={formData.location} onChange={handleInputChange} style={styles.input} />
            </>
          )}

          {error && <div style={styles.errorMessage}>{error}</div>}
          {success && <div style={styles.successMessage}>{success}</div>}

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <button style={styles.switchButton} onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
};

// Colors: White, Teal, Blue, Green, Light Grey, Black
const styles = {
  container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6FB', fontFamily: 'Arial, sans-serif' },
  loadingContainer: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6FB' },
  loadingText: { marginTop: 10 },
  spinner: { width: 20, height: 20, border: '3px solid #3CB371', borderTop: '3px solid #1A73E8', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  backButton: { position: 'absolute', top: 20, left: 20, padding: 10, borderRadius: 8, border: 'none', backgroundColor: '#3CB371', color: 'white', cursor: 'pointer' },
  authCard: { backgroundColor: '#FFFFFF', padding: 30, borderRadius: 16, width: 400, display: 'flex', flexDirection: 'column', gap: 15, boxShadow: '0 5px 20px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', color: '#1B263B' },
  userTypeSelector: { display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 10 },
  userTypeButton: { flex: 1, padding: 8, borderRadius: 8, border: '1px solid #3CB371', backgroundColor: '#F4F6FB', color: '#1B263B', cursor: 'pointer' },
  userTypeButtonActive: { backgroundColor: '#3CB371', color: 'white' },
  form: { display: 'flex', flexDirection: 'column', gap: 10 },
  input: { padding: 10, borderRadius: 8, border: '1px solid #ccc', fontSize: 14 },
  submitButton: { padding: 12, borderRadius: 8, border: 'none', backgroundColor: '#1A73E8', color: 'white', cursor: 'pointer' },
  switchButton: { marginTop: 10, background: 'transparent', border: 'none', color: '#3CB371', cursor: 'pointer', textDecoration: 'underline' },
  errorMessage: { padding: 8, borderRadius: 6, backgroundColor: '#fde2e2', color: '#d32f2f' },
  successMessage: { padding: 8, borderRadius: 6, backgroundColor: '#e2f7e1', color: '#27AE60' },
};

export default AuthForm;
