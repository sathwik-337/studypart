import React, { useState } from 'react';
import axios from 'axios';

function Authform() {
  const [mode, setMode] = useState('login'); // login, studentSignup, ownerSignup
  const [userType, setUserType] = useState('student'); // for login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Student signup fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [dob, setDob] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeAddress, setCollegeAddress] = useState('');
  const [collegeIdPdf, setCollegeIdPdf] = useState(null);

  // Owner signup fields
  const [ownerName, setOwnerName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const API_BASE_URL = 'http://localhost:3001'; // replace with your backend

  // Validate student age ≥ 18
  const isValidAge = (dobStr) => {
    const today = new Date();
    const birthDate = new Date(dobStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
        userType,
      });
      alert('Login successful!');
      console.log(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  const handleStudentSignup = async () => {
    setError('');

    if (!isValidAge(dob)) {
      setError('Student must be at least 18 years old.');
      return;
    }

    if (!collegeIdPdf || collegeIdPdf.type !== 'application/pdf') {
      setError('Please upload a valid PDF for college ID proof.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('currentAddress', currentAddress);
    formData.append('permanentAddress', permanentAddress);
    formData.append('dob', dob);
    formData.append('collegeName', collegeName);
    formData.append('collegeAddress', collegeAddress);
    formData.append('collegeIdPdf', collegeIdPdf);

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/signup/student`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Student signup successful!');
      console.log(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  const handleOwnerSignup = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/signup/owner`, {
        ownerName,
        companyName,
      });
      alert('Owner signup successful!');
      console.log(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#000080]">
        {mode === 'login' && 'Login'}
        {mode === 'studentSignup' && 'Student Signup'}
        {mode === 'ownerSignup' && 'Owner Signup'}
      </h2>

      {error && <p className="text-red-600 mb-4 text-center bg-red-50 py-2 rounded-md border border-red-200">{error}</p>}

      {/* Login Form */}
      {mode === 'login' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-[#00004d]">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">User Type</label>
            <select value={userType} onChange={e => setUserType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent">
              <option value="student">Student</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <button onClick={handleLogin} disabled={loading}
            className="w-full bg-[#000080] text-white py-2 rounded hover:bg-[#00004d] transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center mt-4 text-gray-600">
            No account?{' '}
            <span className="text-[#000080] cursor-pointer hover:text-[#00004d] font-medium" onClick={() => setMode('studentSignup')}>Student Signup</span> |{' '}
            <span className="text-[#000080] cursor-pointer hover:text-[#00004d] font-medium" onClick={() => setMode('ownerSignup')}>Owner Signup</span>
          </p>
        </div>
      )}

      {/* Student Signup Form */}
      {mode === 'studentSignup' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-[#00004d]">First Name</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">Last Name</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">Current Address</label>
            <input type="text" value={currentAddress} onChange={e => setCurrentAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">Permanent Address</label>
            <input type="text" value={permanentAddress} onChange={e => setPermanentAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">Date of Birth</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" max={new Date().toISOString().split("T")[0]} />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">College Name</label>
            <input type="text" value={collegeName} onChange={e => setCollegeName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">College Address</label>
            <input type="text" value={collegeAddress} onChange={e => setCollegeAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">College ID Proof (PDF)</label>
            <input type="file" accept="application/pdf" onChange={e => setCollegeIdPdf(e.target.files[0])}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#000080] file:text-white hover:file:bg-[#00004d]" />
          </div>

          <button onClick={handleStudentSignup} disabled={loading}
            className="w-full bg-[#000080] text-white py-2 rounded hover:bg-[#00004d] transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <span className="text-[#000080] cursor-pointer hover:text-[#00004d] font-medium" onClick={() => setMode('login')}>Login</span>
          </p>
        </div>
      )}

      {/* Owner Signup Form */}
      {mode === 'ownerSignup' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-[#00004d]">Owner Name</label>
            <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#00004d]">Company Name</label>
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent" />
          </div>

          <button onClick={handleOwnerSignup} disabled={loading}
            className="w-full bg-[#000080] text-white py-2 rounded hover:bg-[#00004d] transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <span className="text-[#000080] cursor-pointer hover:text-[#00004d] font-medium" onClick={() => setMode('login')}>Login</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Authform;