import React, { useState, useEffect } from 'react';
// import API_BASE_URL, { API_ENDPOINTS } from '../config/api';

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');
  const [colleges, setColleges] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
  }, []);

  const fetchColleges = async () => {
    try {
      setLoadingColleges(true);
      const res = await fetch(`${API_BASE_URL}/api/colleges`);
      if (res.ok) {
        const data = await res.json();
        setColleges(data);
      }
    } catch (err) {
      console.error(err);
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
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleSignup();
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.login}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, password: formData.password, userType })
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('Login successful!');
      setTimeout(() => onLogin(data.user), 1000);
    } else {
      setError(data.error || 'Login failed');
    }
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    submitData.append('userType', userType);

    if (userType === 'student') {
      if (!formData.dateOfBirth || !formData.collegeId || !formData.studentCollegeId || !formData.collegeIdPdf) {
        setError('All student fields including college ID PDF are required');
        return;
      }
      submitData.append('dateOfBirth', formData.dateOfBirth);
      submitData.append('collegeId', formData.collegeId);
      submitData.append('studentCollegeId', formData.studentCollegeId);
      submitData.append('collegeIdPdf', formData.collegeIdPdf);
    } else if (userType === 'owner') {
      if (!formData.organizationName) {
        setError('Organization name is required for owners');
        return;
      }
      submitData.append('organizationName', formData.organizationName);
      if (formData.location) submitData.append('location', formData.location);
    }

    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.signup}`, { method: 'POST', body: submitData });
    const data = await res.json();
    if (res.ok) {
      setSuccess(data.message);
      setTimeout(() => setIsLogin(true), 2000);
    } else {
      setError(data.error || 'Signup failed');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? 'Login' : 'Signup'}</h2>

        <div style={styles.userType}>
          <label>
            <input type="radio" value="student" checked={userType === 'student'} onChange={() => setUserType('student')} />
            Student
          </label>
          <label>
            <input type="radio" value="owner" checked={userType === 'owner'} onChange={() => setUserType('owner')} />
            Owner
          </label>
          <label>
            <input type="radio" value="admin" checked={userType === 'admin'} onChange={() => setUserType('admin')} />
            Admin
          </label>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && userType === 'student' && (
            <>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} style={styles.input} required />
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} style={styles.input} required />
              <select name="collegeId" value={formData.collegeId} onChange={handleInputChange} style={styles.input} required>
                <option value="">Select College</option>
                {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input type="text" name="studentCollegeId" placeholder="College ID Number" value={formData.studentCollegeId} onChange={handleInputChange} style={styles.input} required />
              <input type="file" name="collegeIdPdf" onChange={handleFileChange} style={styles.input} accept="application/pdf" required />
            </>
          )}

          {!isLogin && userType === 'owner' && (
            <>
              <input type="text" name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleInputChange} style={styles.input} required />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} style={styles.input} />
            </>
          )}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} style={styles.input} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} style={styles.input} required />
          {!isLogin && <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} style={styles.input} required />}

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <button type="submit" style={styles.button} disabled={loading}>{loading ? 'Processing...' : isLogin ? 'Login' : 'Signup'}</button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#e6f7f1' },
  card: { background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '100%', maxWidth: '450px' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#00796b' },
  userType: { display: 'flex', justifyContent: 'space-around', marginBottom: '20px', color: '#004d40' },
  form: { display: 'flex', flexDirection: 'column' },
  input: { marginBottom: '15px', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' },
  button: { padding: '12px', borderRadius: '6px', border: 'none', background: '#00796b', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: '0.3s' },
  error: { color: 'red', marginBottom: '10px', fontWeight: 'bold' },
  success: { color: 'green', marginBottom: '10px', fontWeight: 'bold' },
  toggleText: { textAlign: 'center', marginTop: '15px' },
  toggleButton: { marginLeft: '5px', color: '#00796b', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }
};

export default AuthForm;
