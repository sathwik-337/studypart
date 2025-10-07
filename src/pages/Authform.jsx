import React, { useState } from 'react';
import axios from 'axios';

function Authform() {
  const [mode, setMode] = useState('login');
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [dob, setDob] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeAddress, setCollegeAddress] = useState('');
  const [collegeIdPdf, setCollegeIdPdf] = useState(null);
  const [ownerName, setOwnerName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const API_BASE_URL = 'http://localhost:3001';

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
    <div className="min-h-screen bg-gradient-to-br from-[#000080] to-[#00004d] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CampusStay</h1>
          <p className="text-blue-100">Find your perfect student accommodation</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Mode Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                mode === 'login'
                  ? 'bg-white text-[#000080] shadow-sm'
                  : 'text-gray-600 hover:text-[#000080]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('studentSignup')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                mode === 'studentSignup'
                  ? 'bg-white text-[#000080] shadow-sm'
                  : 'text-gray-600 hover:text-[#000080]'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setMode('ownerSignup')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                mode === 'ownerSignup'
                  ? 'bg-white text-[#000080] shadow-sm'
                  : 'text-gray-600 hover:text-[#000080]'
              }`}
            >
              Owner
            </button>
          </div>

          {/* Form Title */}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'studentSignup' && 'Student Registration'}
            {mode === 'ownerSignup' && 'Owner Registration'}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <div className="w-2 h-8 bg-red-500 rounded-full mr-3"></div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  User Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setUserType('student')}
                    className={`py-3 px-4 rounded-lg border-2 transition-all duration-300 font-medium ${
                      userType === 'student'
                        ? 'border-[#000080] bg-blue-50 text-[#000080]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() => setUserType('owner')}
                    className={`py-3 px-4 rounded-lg border-2 transition-all duration-300 font-medium ${
                      userType === 'owner'
                        ? 'border-[#000080] bg-blue-50 text-[#000080]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    Owner
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#000080] to-[#00004d] text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <span
                    className="text-[#000080] font-semibold cursor-pointer hover:text-[#00004d] transition-colors duration-300"
                    onClick={() => setMode('studentSignup')}
                  >
                    Sign up as Student
                  </span>{' '}
                  or{' '}
                  <span
                    className="text-[#000080] font-semibold cursor-pointer hover:text-[#00004d] transition-colors duration-300"
                    onClick={() => setMode('ownerSignup')}
                  >
                    Owner
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Student Signup Form */}
          {mode === 'studentSignup' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Address
                </label>
                <input
                  type="text"
                  value={currentAddress}
                  onChange={e => setCurrentAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  placeholder="Your current residential address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Permanent Address
                </label>
                <input
                  type="text"
                  value={permanentAddress}
                  onChange={e => setPermanentAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  placeholder="Your permanent home address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={e => setCollegeName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  placeholder="University name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  College Address
                </label>
                <input
                  type="text"
                  value={collegeAddress}
                  onChange={e => setCollegeAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  placeholder="College campus address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  College ID Proof (PDF)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#000080] transition-all duration-300">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => setCollegeIdPdf(e.target.files[0])}
                    className="hidden"
                    id="collegeIdPdf"
                  />
                  <label htmlFor="collegeIdPdf" className="cursor-pointer">
                    <div className="text-gray-500 mb-2">
                      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">
                      {collegeIdPdf ? collegeIdPdf.name : 'Click to upload PDF file'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Maximum file size: 5MB</p>
                  </label>
                </div>
              </div>

              <button
                onClick={handleStudentSignup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#000080] to-[#00004d] text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Student Account'
                )}
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <span
                    className="text-[#000080] font-semibold cursor-pointer hover:text-[#00004d] transition-colors duration-300"
                    onClick={() => setMode('login')}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Owner Signup Form */}
          {mode === 'ownerSignup' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={e => setOwnerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all duration-300"
                  placeholder="Your company or business name"
                />
              </div>

              <button
                onClick={handleOwnerSignup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#000080] to-[#00004d] text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Owner Account'
                )}
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <span
                    className="text-[#000080] font-semibold cursor-pointer hover:text-[#00004d] transition-colors duration-300"
                    onClick={() => setMode('login')}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authform;