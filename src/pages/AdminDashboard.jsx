import React, { useState, useEffect } from 'react';
import StudentRegistrationManagement from '../components/StudentRegistrationManagement';
import API_BASE_URL, { API_ENDPOINTS } from '../config/api';

// Homepage color palette
const COLORS = {
  white: "#FFFFFF",
  background: "linear-gradient(135deg, #E3ECFB 0%, #F9FBFF 100%)",
  alternateBackground: "#EAF1FB",
  primary: {
    main: "#4F8EF7",
    secondary: "#1A73E8",
    dark: "#1B263B",
    gradient: "linear-gradient(135deg, #4F8EF7 0%, #1A73E8 100%)"
  },
  accent: {
    green: "#27AE60",
    lightGreen: "#50C878",
    gradient: "linear-gradient(135deg, #27AE60 0%, #50C878 100%)"
  },
  light: {
    blue: "#8CC1FF",
    background: "#E3ECFB",
    secondary: "#EAF1FB"
  },
  text: "#1B263B",
  subText: "#6B7280",
  border: "rgba(79, 142, 247, 0.1)",
  cardBackground: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)",
  sidebarGradient: "linear-gradient(135deg, #4F8EF7 0%, #1A73E8 100%)",
  buttonGradient: "linear-gradient(135deg, #4F8EF7 0%, #1A73E8 100%)",
  buttonHoverGradient: "linear-gradient(135deg, #1A73E8 0%, #1B263B 100%)",
  statusGradient: "linear-gradient(135deg, #27AE60 0%, #50C878 100%)"
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [systemStats, setSystemStats] = useState({});
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data from API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        return;
      }

      // Fetch real statistics from the backend
      await Promise.all([
        fetchUsers(),
        fetchCompanies(),
        fetchJobs(),
        fetchEvents(),
        fetchSystemStats(),
        fetchActivityLog()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/companies`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCompanies(data.companies || []);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    }
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/jobs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    }
  };

  const fetchSystemStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSystemStats(data.stats || {
          totalUsers: 0,
          totalStudents: 0,
          totalOwners: 0,
          totalAdmins: 0,
          pendingRegistrations: 0,
          approvedStudents: 0,
          activeJobs: 0,
          totalApplications: 0,
          totalEvents: 0,
          systemUptime: '100%'
        });
      }
    } catch (error) {
      console.error('Error fetching system stats:', error);
      setSystemStats({
        totalUsers: 0,
        totalStudents: 0,
        totalOwners: 0,
        totalAdmins: 0,
        pendingRegistrations: 0,
        approvedStudents: 0,
        activeJobs: 0,
        totalApplications: 0,
        totalEvents: 0,
        systemUptime: '100%'
      });
    }
  };

  const fetchActivityLog = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/activity`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setActivityLog(data.activities || []);
      }
    } catch (error) {
      console.error('Error fetching activity log:', error);
      setActivityLog([]);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: action === 'suspend' ? 'suspended' : action === 'activate' ? 'active' : user.status }
        : user
    ));
    
    // Add to activity log
    const newActivity = {
      id: activityLog.length + 1,
      action: `User ${action}ed`,
      user: 'admin@platform.com',
      timestamp: 'Just now',
      type: 'admin'
    };
    setActivityLog([newActivity, ...activityLog]);
  };

  const handleContentModeration = (type, id, status) => {
    if (type === 'job') {
      setJobs(jobs.map(job => job.id === id ? { ...job, status } : job));
    } else if (type === 'event') {
      setEvents(events.map(event => event.id === id ? { ...event, status } : event));
    }
    
    const newActivity = {
      id: activityLog.length + 1,
      action: `${type} ${status}`,
      user: 'admin@platform.com',
      timestamp: 'Just now',
      type: 'content'
    };
    setActivityLog([newActivity, ...activityLog]);
  };

  const renderDashboardOverview = () => (
    <div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1B263B',
        marginBottom: '2rem'
      }}>Admin Dashboard Overview</h1>

      {/* System Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Users Stats */}
        <div style={{
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
          border: '1px solid rgba(244, 246, 251, 0.8)'
        }}>
          <h3 style={{ fontSize: '0.875rem', color: '#4A5A6A', margin: '0 0 0.5rem' }}>Approved Students</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#059669' }}>{systemStats.approvedStudents || 0}</div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>
            Active student accounts
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
          border: '1px solid rgba(244, 246, 251, 0.8)'
        }}>
          <h3 style={{ fontSize: '0.875rem', color: '#4A5A6A', margin: '0 0 0.5rem' }}>Pending Registrations</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>{systemStats.pendingRegistrations || 0}</div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>
            Awaiting approval
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
          border: '1px solid rgba(244, 246, 251, 0.8)'
        }}>
          <h3 style={{ fontSize: '0.875rem', color: '#4A5A6A', margin: '0 0 0.5rem' }}>Total Companies</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#7C3AED' }}>{systemStats.totalCompanies || 0}</div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>
            Registered companies
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
          border: '1px solid rgba(244, 246, 251, 0.8)'
        }}>
          <h3 style={{ fontSize: '0.875rem', color: '#4A5A6A', margin: '0 0 0.5rem' }}>Total Applications</h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#059669' }}>{systemStats.totalApplications || 0}</div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>
            Job applications submitted
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['users', 'companies', 'content', 'analytics', 'settings'].map(action => (
            <button
              key={action}
              onClick={() => handleTabChange(action)}
              style={{
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              Manage {action}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
          Recent Activity
        </h2>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
          overflow: 'hidden'
        }}>
          {activityLog.slice(0, 5).map((activity, index) => (
            <div key={activity.id} style={{
              padding: '1rem 1.5rem',
              borderBottom: index < 4 ? '1px solid #E5E7EB' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: '500', color: '#1B263B' }}>
                  {activity.action}
                </p>
                <p style={{ margin: '0', fontSize: '0.875rem', color: '#6B7280' }}>
                  by {activity.user}
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  background: activity.type === 'security' ? '#FEE2E2' : 
                           activity.type === 'admin' ? '#DBEAFE' :
                           activity.type === 'content' ? '#D1FAE5' : '#F3F4F6',
                  color: activity.type === 'security' ? '#DC2626' : 
                         activity.type === 'admin' ? '#2563EB' :
                         activity.type === 'content' ? '#059669' : '#6B7280'
                }}>
                  {activity.type}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  {activity.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1B263B',
        marginBottom: '2rem'
      }}>User Management</h1>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #E5E7EB',
          background: '#F9FAFB'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 2fr',
            gap: '1rem',
            fontWeight: '600',
            color: '#374151',
            fontSize: '0.875rem'
          }}>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Join Date</span>
            <span>Actions</span>
          </div>
        </div>

        {users.map((user, index) => (
          <div key={user.id} style={{
            padding: '1rem 1.5rem',
            borderBottom: index < users.length - 1 ? '1px solid #E5E7EB' : 'none'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 2fr',
              gap: '1rem',
              alignItems: 'center',
              fontSize: '0.875rem'
            }}>
              <span style={{ fontWeight: '500', color: '#1B263B' }}>{user.name}</span>
              <span style={{ color: '#6B7280' }}>{user.email}</span>
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '500',
                background: user.role === 'admin' ? '#FEE2E2' : 
                           user.role === 'owner' ? '#DBEAFE' : '#D1FAE5',
                color: user.role === 'admin' ? '#DC2626' : 
                       user.role === 'owner' ? '#2563EB' : '#059669',
                textAlign: 'center'
              }}>
                {user.role}
              </span>
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '500',
                background: user.status === 'active' ? '#D1FAE5' : '#FEE2E2',
                color: user.status === 'active' ? '#059669' : '#DC2626',
                textAlign: 'center'
              }}>
                {user.status}
              </span>
              <span style={{ color: '#6B7280' }}>{user.joinDate}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    background: user.status === 'active' ? '#FEE2E2' : '#D1FAE5',
                    color: user.status === 'active' ? '#DC2626' : '#059669'
                  }}
                >
                  {user.status === 'active' ? 'Suspend' : 'Activate'}
                </button>
                <button
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    background: '#F3F4F6',
                    color: '#374151'
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompanyManagement = () => (
    <div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1B263B',
        marginBottom: '2rem'
      }}>Company Management</h1>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #E5E7EB',
          background: '#F9FAFB'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 2fr',
            gap: '1rem',
            fontWeight: '600',
            color: '#374151',
            fontSize: '0.875rem'
          }}>
            <span>Company</span>
            <span>Status</span>
            <span>Owner</span>
            <span>Employees</span>
            <span>Industry</span>
            <span>Actions</span>
          </div>
        </div>

        {companies.map((company, index) => (
          <div key={company.id} style={{
            padding: '1rem 1.5rem',
            borderBottom: index < companies.length - 1 ? '1px solid #E5E7EB' : 'none'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 2fr',
              gap: '1rem',
              alignItems: 'center',
              fontSize: '0.875rem'
            }}>
              <span style={{ fontWeight: '500', color: '#1B263B' }}>{company.name}</span>
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '500',
                background: company.status === 'verified' ? '#D1FAE5' : 
                           company.status === 'pending' ? '#FEF3C7' : '#FEE2E2',
                color: company.status === 'verified' ? '#059669' : 
                       company.status === 'pending' ? '#D97706' : '#DC2626',
                textAlign: 'center'
              }}>
                {company.status}
              </span>
              <span style={{ color: '#6B7280' }}>{company.owner}</span>
              <span style={{ color: '#6B7280' }}>{company.employees}</span>
              <span style={{ color: '#6B7280' }}>{company.industry}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {company.status === 'pending' && (
                  <>
                    <button style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      background: '#D1FAE5',
                      color: '#059669'
                    }}>
                      Approve
                    </button>
                    <button style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      background: '#FEE2E2',
                      color: '#DC2626'
                    }}>
                      Reject
                    </button>
                  </>
                )}
                <button style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  background: '#F3F4F6',
                  color: '#374151'
                }}>
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1B263B',
        marginBottom: '2rem'
      }}>Content Management</h1>

      {/* Jobs Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
          Job Postings
        </h2>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #E5E7EB',
            background: '#F9FAFB'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 2fr',
              gap: '1rem',
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.875rem'
            }}>
              <span>Job Title</span>
              <span>Company</span>
              <span>Status</span>
              <span>Applications</span>
              <span>Posted</span>
              <span>Actions</span>
            </div>
          </div>

          {jobs.map((job, index) => (
            <div key={job.id} style={{
              padding: '1rem 1.5rem',
              borderBottom: index < jobs.length - 1 ? '1px solid #E5E7EB' : 'none'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 2fr',
                gap: '1rem',
                alignItems: 'center',
                fontSize: '0.875rem'
              }}>
                <span style={{ fontWeight: '500', color: '#1B263B' }}>{job.title}</span>
                <span style={{ color: '#6B7280' }}>{job.company}</span>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  background: job.status === 'approved' ? '#D1FAE5' : 
                             job.status === 'pending' ? '#FEF3C7' : '#FEE2E2',
                  color: job.status === 'approved' ? '#059669' : 
                         job.status === 'pending' ? '#D97706' : '#DC2626',
                  textAlign: 'center'
                }}>
                  {job.status}
                </span>
                <span style={{ color: '#6B7280' }}>{job.applications}</span>
                <span style={{ color: '#6B7280' }}>{job.posted}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {job.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleContentModeration('job', job.id, 'approved')}
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          border: 'none',
                          cursor: 'pointer',
                          background: '#D1FAE5',
                          color: '#059669'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleContentModeration('job', job.id, 'rejected')}
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          border: 'none',
                          cursor: 'pointer',
                          background: '#FEE2E2',
                          color: '#DC2626'
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {job.status === 'flagged' && (
                    <button
                      onClick={() => handleContentModeration('job', job.id, 'approved')}
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                        background: '#FEF3C7',
                        color: '#D97706'
                      }}
                    >
                      Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
          Events
        </h2>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #E5E7EB',
            background: '#F9FAFB'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 2fr',
              gap: '1rem',
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.875rem'
            }}>
              <span>Event Title</span>
              <span>Organizer</span>
              <span>Status</span>
              <span>Attendees</span>
              <span>Date</span>
              <span>Actions</span>
            </div>
          </div>

          {events.map((event, index) => (
            <div key={event.id} style={{
              padding: '1rem 1.5rem',
              borderBottom: index < events.length - 1 ? '1px solid #E5E7EB' : 'none'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 2fr',
                gap: '1rem',
                alignItems: 'center',
                fontSize: '0.875rem'
              }}>
                <span style={{ fontWeight: '500', color: '#1B263B' }}>{event.title}</span>
                <span style={{ color: '#6B7280' }}>{event.organizer}</span>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  background: event.status === 'approved' ? '#D1FAE5' : '#FEF3C7',
                  color: event.status === 'approved' ? '#059669' : '#D97706',
                  textAlign: 'center'
                }}>
                  {event.status}
                </span>
                <span style={{ color: '#6B7280' }}>{event.attendees}</span>
                <span style={{ color: '#6B7280' }}>{event.date}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {event.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleContentModeration('event', event.id, 'approved')}
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          border: 'none',
                          cursor: 'pointer',
                          background: '#D1FAE5',
                          color: '#059669'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleContentModeration('event', event.id, 'rejected')}
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          border: 'none',
                          cursor: 'pointer',
                          background: '#FEE2E2',
                          color: '#DC2626'
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    background: '#F3F4F6',
                    color: '#374151'
                  }}>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1B263B',
        marginBottom: '2rem'
      }}>Analytics & Reporting</h1>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
            User Engagement
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#059669', marginBottom: '0.5rem' }}>
            85.2%
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
            Daily active users
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
            Application Success Rate
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2563EB', marginBottom: '0.5rem' }}>
            23.4%
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
            Applications to hires ratio
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
            Platform Performance
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#7C3AED', marginBottom: '0.5rem' }}>
            1.2s
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
            Average page load time
          </p>
        </div>
      </div>

      {/* Report Generation */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
          Generate Reports
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['User Activity', 'Job Performance', 'Event Analytics', 'System Health'].map(report => (
            <button
              key={report}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: '1px solid #D1D5DB',
                background: 'white',
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              Export {report}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1B263B',
        marginBottom: '2rem'
      }}>System Configuration</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Platform Settings */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
            Platform Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['User Registration', 'Job Posting Approval', 'Event Approval', 'Email Notifications'].map(setting => (
              <div key={setting} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>{setting}</span>
                <button style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  border: 'none',
                  background: '#D1FAE5',
                  color: '#059669',
                  cursor: 'pointer'
                }}>
                  Enabled
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Controls */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
            Security Controls
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Two-Factor Authentication', 'Session Management', 'Audit Logging', 'API Rate Limiting'].map(control => (
              <div key={control} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>{control}</span>
                <button style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  border: 'none',
                  background: '#D1FAE5',
                  color: '#059669',
                  cursor: 'pointer'
                }}>
                  Active
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Email Templates */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
            Email Templates
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Welcome Email', 'Job Application', 'Event Registration', 'Password Reset'].map(template => (
              <button
                key={template}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  border: '1px solid #D1D5DB',
                  background: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                Edit {template}
              </button>
            ))}
          </div>
        </div>

        {/* API Management */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(27, 38, 59, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1B263B', marginBottom: '1rem' }}>
            API Management
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>API Status</span>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '500',
                background: '#D1FAE5',
                color: '#059669'
              }}>
                Operational
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>Rate Limit</span>
              <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>1000/hour</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>Active Keys</span>
              <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>47</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F4F6FB',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #DC2626',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6B7280', fontSize: '1rem' }}>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#F4F6FB',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: '#DC2626',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '2rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '700',
            margin: '0'
          }}>StudyPart Admin</h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.875rem',
            margin: '0.5rem 0 0'
          }}>System Administration</p>
        </div>

        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {[
            { key: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
            { key: 'student-registrations', label: 'Student Registrations', icon: '🎓' },
            { key: 'users', label: 'User Management', icon: '👥' },
            { key: 'companies', label: 'Company Management', icon: '🏢' },
            { key: 'content', label: 'Content Management', icon: '📝' },
            { key: 'analytics', label: 'Analytics & Reports', icon: '📈' },
            { key: 'settings', label: 'System Settings', icon: '⚙️' }
          ].map(item => (
            <button
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem 1.5rem',
                background: activeTab === item.key ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: 'white',
                border: 'none',
                textAlign: 'left',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderLeft: activeTab === item.key ? '4px solid white' : '4px solid transparent',
                gap: '0.75rem'
              }}
              onClick={() => handleTabChange(item.key)}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.background = activeTab === item.key ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0.75rem',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursor: 'pointer',
            gap: '0.5rem'
          }}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '2rem',
        overflow: 'auto'
      }}>
        {activeTab === 'dashboard' && renderDashboardOverview()}
        {activeTab === 'student-registrations' && <StudentRegistrationManagement />}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'companies' && renderCompanyManagement()}
        {activeTab === 'content' && renderContentManagement()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

// Add CSS animation for loading spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default AdminDashboard;