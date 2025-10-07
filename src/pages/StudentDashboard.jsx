import React, { useState, useEffect } from 'react';
import { useJobs, useEvents, useApplications, useLocalStorage } from '../hooks/useStudentDashboard';
import { JobApplicationModal, EventRegistrationModal } from '../components/Modal';
import './StudentDashboard.css';

const StudentDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState(() => 
    localStorage.getItem('studentDashboardTab') || 'dashboard'
  );
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState({
    jobs: false,
    events: false,
    applications: false
  });
  const [filters, setFilters] = useState({
    jobSearch: '',
    jobLocation: '',
    jobType: '',
    eventSearch: '',
    eventLocation: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  // Mock student data
  const studentData = {
    name: "John Doe",
    email: "john.doe@student.edu",
    avatar: "/api/placeholder/50/50",
    id: "STU001"
  };

  // Mock API data
  const mockJobs = [
    {
      id: 1,
      title: "Software Engineer Intern",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "Internship",
      description: "Join our team as a software engineering intern...",
      requirements: ["JavaScript", "React", "Node.js"]
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Data Solutions Inc",
      location: "New York, NY",
      type: "Full-time",
      description: "Analyze large datasets to drive business decisions...",
      requirements: ["Python", "SQL", "Tableau"]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Part-time",
      description: "Create beautiful and intuitive user interfaces...",
      requirements: ["Figma", "Adobe Creative Suite", "User Research"]
    }
  ];

  const mockEvents = [
    {
      id: 1,
      name: "Tech Career Fair 2025",
      date: "2025-11-15",
      time: "10:00 AM - 4:00 PM",
      location: "University Convention Center",
      description: "Meet with top tech companies and explore career opportunities"
    },
    {
      id: 2,
      name: "Networking Workshop",
      date: "2025-10-20",
      time: "2:00 PM - 5:00 PM",
      location: "Business Building Room 201",
      description: "Learn effective networking strategies for your career"
    },
    {
      id: 3,
      name: "Resume Building Seminar",
      date: "2025-10-25",
      time: "1:00 PM - 3:00 PM",
      location: "Student Center Auditorium",
      description: "Get expert tips on creating a standout resume"
    }
  ];

  const mockApplications = [
    {
      id: 1,
      type: "job",
      title: "Software Engineer Intern",
      company: "Tech Corp",
      appliedDate: "2025-10-01",
      status: "pending"
    },
    {
      id: 2,
      type: "event",
      title: "Tech Career Fair 2025",
      company: "University",
      appliedDate: "2025-09-28",
      status: "accepted"
    },
    {
      id: 3,
      type: "job",
      title: "Data Analyst",
      company: "Data Solutions Inc",
      appliedDate: "2025-09-25",
      status: "rejected"
    }
  ];

  // Effect to persist active tab
  useEffect(() => {
    localStorage.setItem('studentDashboardTab', activeTab);
  }, [activeTab]);

  // Simulate API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(prev => ({ ...prev, jobs: true, events: true, applications: true }));
      
      // Simulate API delay
      setTimeout(() => {
        setJobs(mockJobs);
        setEvents(mockEvents);
        setApplications(mockApplications);
        setLoading({ jobs: false, events: false, applications: false });
      }, 1000);
    };

    fetchData();
  }, []);

  // Filter functions
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(filters.jobSearch.toLowerCase()) &&
    (filters.jobLocation === '' || job.location.includes(filters.jobLocation)) &&
    (filters.jobType === '' || job.type === filters.jobType)
  );

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(filters.eventSearch.toLowerCase()) &&
    (filters.eventLocation === '' || event.location.includes(filters.eventLocation))
  );

  // Statistics calculations
  const stats = {
    totalApplications: applications.length,
    acceptedApplications: applications.filter(app => app.status === 'accepted').length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    rejectedApplications: applications.filter(app => app.status === 'rejected').length
  };

  // Handler functions
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleApplyJob = (job) => {
    setSelectedItem(job);
    setModalType('job');
    setShowModal(true);
  };

  const handleRegisterEvent = (event) => {
    setSelectedItem(event);
    setModalType('event');
    setShowModal(true);
  };

  const handleSubmitApplication = async () => {
    const newApplication = {
      id: applications.length + 1,
      type: modalType,
      title: selectedItem.title || selectedItem.name,
      company: selectedItem.company || 'University',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setApplications(prev => [...prev, newApplication]);
    setShowModal(false);
    setCoverLetter('');
    setSelectedItem(null);
    
    // Show success message (you could use a toast library here)
    alert(`Successfully ${modalType === 'job' ? 'applied for' : 'registered for'} ${newApplication.title}!`);
  };

  const handleLogout = () => {
    // Implement logout logic here
    alert('Logout functionality to be implemented');
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="profile-section">
          <img src={studentData.avatar} alt="Profile" className="profile-avatar" />
          <h3>{studentData.name}</h3>
          <p>{studentData.email}</p>
        </div>
        
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => handleTabChange('jobs')}
          >
            💼 Browse Jobs
          </button>
          <button 
            className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => handleTabChange('events')}
          >
            📅 Browse Events
          </button>
          <button 
            className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => handleTabChange('applications')}
          >
            📋 My Applications
          </button>
        </nav>
        
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <h1>Dashboard Overview</h1>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Applications</h3>
                <div className="stat-number">{stats.totalApplications}</div>
              </div>
              <div className="stat-card accepted">
                <h3>Accepted</h3>
                <div className="stat-number">{stats.acceptedApplications}</div>
              </div>
              <div className="stat-card pending">
                <h3>Pending</h3>
                <div className="stat-number">{stats.pendingApplications}</div>
              </div>
              <div className="stat-card rejected">
                <h3>Rejected</h3>
                <div className="stat-number">{stats.rejectedApplications}</div>
              </div>
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button onClick={() => handleTabChange('jobs')} className="action-btn">
                  Browse Jobs
                </button>
                <button onClick={() => handleTabChange('events')} className="action-btn">
                  Browse Events
                </button>
                <button onClick={() => handleTabChange('applications')} className="action-btn">
                  View Applications
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {applications.slice(0, 3).map(app => (
                  <div key={app.id} className="activity-item">
                    <span>{app.type === 'job' ? '💼' : '📅'}</span>
                    <div>
                      <p><strong>{app.title}</strong></p>
                      <p>Applied on {app.appliedDate}</p>
                    </div>
                    <span className={`status-badge ${app.status}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Browse Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="jobs-tab">
            <h1>Browse Jobs</h1>
            
            <div className="filters">
              <input
                type="text"
                placeholder="Search jobs..."
                value={filters.jobSearch}
                onChange={(e) => setFilters(prev => ({ ...prev, jobSearch: e.target.value }))}
                className="search-input"
              />
              <select
                value={filters.jobLocation}
                onChange={(e) => setFilters(prev => ({ ...prev, jobLocation: e.target.value }))}
                className="filter-select"
              >
                <option value="">All Locations</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Remote">Remote</option>
              </select>
              <select
                value={filters.jobType}
                onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {loading.jobs ? (
              <div className="loading">Loading jobs...</div>
            ) : (
              <div className="jobs-grid">
                {filteredJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                    <p className="location">📍 {job.location}</p>
                    <p className="type">🏷️ {job.type}</p>
                    <p className="description">{job.description}</p>
                    <div className="requirements">
                      <strong>Requirements:</strong>
                      <div className="requirement-tags">
                        {job.requirements.map(req => (
                          <span key={req} className="requirement-tag">{req}</span>
                        ))}
                      </div>
                    </div>
                    <button 
                      className="apply-btn"
                      onClick={() => handleApplyJob(job)}
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Browse Events Tab */}
        {activeTab === 'events' && (
          <div className="events-tab">
            <h1>Browse Events</h1>
            
            <div className="filters">
              <input
                type="text"
                placeholder="Search events..."
                value={filters.eventSearch}
                onChange={(e) => setFilters(prev => ({ ...prev, eventSearch: e.target.value }))}
                className="search-input"
              />
              <select
                value={filters.eventLocation}
                onChange={(e) => setFilters(prev => ({ ...prev, eventLocation: e.target.value }))}
                className="filter-select"
              >
                <option value="">All Locations</option>
                <option value="University">University</option>
                <option value="Convention Center">Convention Center</option>
                <option value="Business Building">Business Building</option>
              </select>
            </div>

            {loading.events ? (
              <div className="loading">Loading events...</div>
            ) : (
              <div className="events-grid">
                {filteredEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <h3>{event.name}</h3>
                    <p className="date">📅 {event.date}</p>
                    <p className="time">🕐 {event.time}</p>
                    <p className="location">📍 {event.location}</p>
                    <p className="description">{event.description}</p>
                    <button 
                      className="register-btn"
                      onClick={() => handleRegisterEvent(event)}
                    >
                      Register Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'applications' && (
          <div className="applications-tab">
            <h1>My Applications</h1>
            
            {loading.applications ? (
              <div className="loading">Loading applications...</div>
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app.id} className="application-card">
                    <div className="app-info">
                      <span className="app-icon">
                        {app.type === 'job' ? '💼' : '📅'}
                      </span>
                      <div className="app-details">
                        <h3>{app.title}</h3>
                        <p>{app.company}</p>
                        <p>Applied: {app.appliedDate}</p>
                      </div>
                    </div>
                    <span className={`status-badge ${app.status}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                ))}
                
                {applications.length === 0 && (
                  <div className="no-applications">
                    <p>No applications yet. Start browsing jobs and events!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Applications */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>
              {modalType === 'job' ? 'Apply for Job' : 'Register for Event'}
            </h2>
            <div className="modal-content">
              <h3>{selectedItem?.title || selectedItem?.name}</h3>
              <p>{selectedItem?.company || 'University Event'}</p>
              
              {modalType === 'job' && (
                <div className="cover-letter-section">
                  <label htmlFor="coverLetter">Cover Letter:</label>
                  <textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Write a brief cover letter explaining why you're interested in this position..."
                    rows={6}
                  />
                </div>
              )}
              
              <div className="modal-actions">
                <button onClick={() => setShowModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleSubmitApplication} className="submit-btn">
                  {modalType === 'job' ? 'Submit Application' : 'Register'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;