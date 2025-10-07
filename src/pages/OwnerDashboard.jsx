import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import JobManagement from '../components/JobManagement';
import EventManagement from '../components/EventManagement';
import ApplicationReview from '../components/ApplicationReview';
import Analytics from '../components/Analytics';
import API_BASE_URL from '../config/api';

// Homepage color palette with gradients
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

// Main Dashboard Component
const OwnerDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="jobs/*" element={<JobManagement />} />
        <Route path="events/*" element={<EventManagement />} />
        <Route path="applications" element={<ApplicationsManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<OrganizationProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

// Layout Component
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({ organizationName: 'Organization', firstName: '', lastName: '' });

  const menuItems = [
    { label: 'Dashboard Overview', path: 'overview' },
    { label: 'Job Management', path: 'jobs' },
    { label: 'Event Management', path: 'events' },
    { label: 'Applications', path: 'applications' },
    { label: 'Analytics', path: 'analytics' },
    { label: 'Organization Profile', path: 'profile' }
  ];

  // Fetch user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('User profile data:', data); // Debug log
          setUserInfo({
            organizationName: data.user.company_name || data.user.organization_name || `${data.user.first_name} ${data.user.last_name}'s Company`,
            firstName: data.user.first_name,
            lastName: data.user.last_name
          });
        } else {
          console.error('Failed to fetch user profile:', response.status, response.statusText);
          // Set fallback name based on local storage or default
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              setUserInfo({
                organizationName: `${payload.first_name || 'User'}'s Company`,
                firstName: payload.first_name || 'User',
                lastName: payload.last_name || ''
              });
            } catch (e) {
              console.error('Error parsing token:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', background: COLORS.background }}>
      {/* Sidebar */}
      <div style={{ 
        width: '280px', 
        background: COLORS.sidebarGradient,
        boxShadow: '0 0 40px rgba(79, 142, 247, 0.15)',
        borderRadius: '0 24px 24px 0'
      }}>
        {/* Header */}
        <div style={{ 
          padding: '32px 24px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.1)',
          color: COLORS.white,
          borderRadius: '0 24px 0 0',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em' }}>{userInfo.organizationName}</h2>
          <p style={{ fontSize: '0.9rem', opacity: '0.9', fontWeight: '500' }}>Owner Dashboard</p>
        </div>

        {/* Navigation */}
        <nav style={{ marginTop: '24px', padding: '0 16px' }}>
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '16px 20px',
                margin: '4px 0',
                background: location.pathname.includes(item.path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: COLORS.white,
                border: location.pathname.includes(item.path) ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '1rem',
                fontWeight: location.pathname.includes(item.path) ? '600' : '500',
                borderRadius: '12px',
                backdropFilter: location.pathname.includes(item.path) ? 'blur(10px)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!location.pathname.includes(item.path)) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!location.pathname.includes(item.path)) {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = 'transparent';
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', background: 'linear-gradient(135deg, #F9FBFF 0%, #EAF1FB 100%)' }}>
        <header style={{ 
          background: 'rgba(255, 255, 255, 0.8)', 
          boxShadow: '0 4px 20px rgba(79, 142, 247, 0.08)',
          padding: '32px 40px',
          marginBottom: '32px',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(79, 142, 247, 0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: COLORS.text,
              letterSpacing: '-0.02em',
              background: COLORS.primary.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {menuItems.find(item => location.pathname.includes(item.path))?.label || 'Dashboard'}
            </h1>
          </div>
        </header>

        <main style={{ padding: '0 40px 40px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const [metrics, setMetrics] = useState({
    activeJobs: 0,
    totalApplications: 0,
    upcomingEvents: 0,
    conversionRate: '0%'
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch jobs, applications, and events separately since the combined endpoint might have issues
      const [jobsResponse, applicationsResponse, eventsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/jobs/owner/my-jobs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch(`${API_BASE_URL}/api/v1/applications`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch(`${API_BASE_URL}/api/v1/events`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      ]);

      let activeJobs = 0;
      let totalApplications = 0;
      let upcomingEvents = 0;
      let activity = [];

      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        const jobs = jobsData.jobs || [];
        activeJobs = jobs.filter(job => job.status === 'active').length;
        
        // Add recent job posts to activity
        jobs.slice(0, 2).forEach(job => {
          activity.push({
            id: `job-${job.id}`,
            message: `Job "${job.title}" posted`,
            timestamp: job.created_at
          });
        });
      }

      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json();
        totalApplications = applicationsData.total || applicationsData.applications?.length || 0;
        
        // Add recent applications to activity
        const applications = applicationsData.applications || [];
        applications.slice(0, 2).forEach(app => {
          activity.push({
            id: `app-${app.id}`,
            message: `New application received for ${app.job_title}`,
            timestamp: app.applied_at
          });
        });
      }

      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        const events = eventsData.events || [];
        upcomingEvents = events.filter(event => new Date(event.start_date) >= new Date()).length;
        
        // Add recent events to activity
        events.slice(0, 1).forEach(event => {
          activity.push({
            id: `event-${event.id}`,
            message: `Event "${event.title}" scheduled`,
            timestamp: event.created_at
          });
        });
      }

      // Calculate conversion rate (applications per job)
      const conversionRate = activeJobs > 0 ? ((totalApplications / activeJobs) * 100).toFixed(1) + '%' : '0%';

      setMetrics({
        activeJobs,
        totalApplications,
        upcomingEvents,
        conversionRate
      });

      // Sort activity by timestamp and take the most recent
      activity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRecentActivity(activity.slice(0, 5));

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ 
          display: 'inline-block',
          width: '48px',
          height: '48px',
          border: '4px solid rgba(79, 142, 247, 0.1)',
          borderTop: '4px solid #4F8EF7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginLeft: '20px', color: COLORS.subText, fontSize: '1.1rem', fontWeight: '500' }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px' 
      }}>
        <MetricCard title="Active Job Postings" value={loading ? '...' : metrics.activeJobs} color="primary" />
        <MetricCard title="Total Applications" value={loading ? '...' : metrics.totalApplications} color="accent" />
        <MetricCard title="Upcoming Events" value={loading ? '...' : metrics.upcomingEvents} color="primary" />
        <MetricCard title="Conversion Rate" value={loading ? '...' : metrics.conversionRate} color="accent" />
      </div>


      {/* Recent Activity */}
      <div style={{ 
        background: COLORS.cardBackground,
        borderRadius: '20px', 
        padding: '32px',
        boxShadow: '0 10px 40px rgba(79, 142, 247, 0.1)',
        border: `1px solid ${COLORS.border}`,
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '24px',
          color: COLORS.text,
          background: COLORS.primary.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {recentActivity.length === 0 ? (
            <div style={{ 
              padding: '40px',
              textAlign: 'center',
              color: COLORS.subText,
              background: COLORS.alternateBackground,
              borderRadius: '16px',
              border: `1px solid ${COLORS.border}`
            }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>No recent activity</p>
              <p style={{ marginTop: '8px', opacity: 0.8 }}>Start by creating jobs or events!</p>
            </div>
          ) : (
            recentActivity.map((activity) => (
              <div
                key={activity.id}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '16px',
                  border: `1px solid ${COLORS.border}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(5px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 142, 247, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ flex: 1, color: COLORS.text, fontSize: '1rem', fontWeight: '500' }}>{activity.message}</div>
                <div style={{ 
                  color: COLORS.subText,
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : 'Recent'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const MetricCard = ({ title, value, color }) => (
  <div style={{ 
    background: COLORS.cardBackground,
    padding: '32px 24px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(79, 142, 247, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${COLORS.border}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 20px 60px rgba(79, 142, 247, 0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 10px 40px rgba(79, 142, 247, 0.1)';
  }}
  >
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: color === 'primary' ? COLORS.primary.gradient : COLORS.accent.gradient
    }} />
    <div style={{ marginBottom: '16px' }}>
      <h3 style={{ 
        color: COLORS.text,
        fontSize: '1rem', 
        fontWeight: '600',
        opacity: 0.8,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>{title}</h3>
    </div>
    <p style={{ 
      fontSize: '3rem', 
      fontWeight: '800', 
      color: COLORS.text,
      marginTop: '8px',
      background: color === 'primary' ? COLORS.primary.gradient : COLORS.accent.gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em'
    }}>{value}</p>
  </div>
);



// Other Dashboard Sections (Placeholder components)

const ApplicationsManagement = () => (
  <ApplicationReview />
);

const OrganizationProfile = () => (
  <div style={{ padding: '24px' }}>
    <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600' }}>Organization Profile</h2>
    {/* Organization profile implementation */}
  </div>
);

export default OwnerDashboard;