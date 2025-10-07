import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Color palette with gradients
const COLORS = {
  white: "#FFFFFF",
  background: "#F4F6FB",
  alternateBackground: "#F2F6F8",
  teal: {
    light: "#3CB371",
    dark: "#008080",
    gradient: "linear-gradient(135deg, #3CB371 0%, #008080 100%)"
  },
  blue: {
    light: "#1A73E8",
    dark: "#1558B0",
    gradient: "linear-gradient(135deg, #1A73E8 0%, #1558B0 100%)"
  },
  green: {
    light: "#50C878",
    dark: "#27AE60",
    gradient: "linear-gradient(135deg, #50C878 0%, #27AE60 100%)"
  },
  text: "#1B263B",
  subText: "#4A5A6A",
  border: "#E3E7EB",
  cardBackground: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)",
  buttonGradient: "linear-gradient(135deg, #3CB371 0%, #008080 100%)",
  buttonHoverGradient: "linear-gradient(135deg, #008080 0%, #006666 100%)",
  statusGradient: "linear-gradient(135deg, #50C878 0%, #27AE60 100%)"
};

// Main Dashboard Component
const OwnerDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="jobs/*" element={<JobManagement />} />
        <Route path="events/*" element={<EventManagement />} />
        <Route path="applications" element={<ApplicationsManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<CompanyProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

// Layout Component
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard Overview', path: 'overview' },
    { label: 'Job Management', path: 'jobs' },
    { label: 'Event Management', path: 'events' },
    { label: 'Applications', path: 'applications' },
    { label: 'Analytics', path: 'analytics' },
    { label: 'Company Profile', path: 'profile' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: COLORS.background }}>
      {/* Sidebar */}
      <div style={{ 
        width: '280px', 
        background: COLORS.cardBackground,
        boxShadow: '2px 0 12px rgba(0,0,0,0.1)',
        borderRadius: '0 20px 20px 0'
      }}>
        {/* Header */}
        <div style={{ 
          padding: '24px', 
          borderBottom: `1px solid ${COLORS.border}`,
          background: COLORS.teal.gradient,
          color: COLORS.white,
          borderRadius: '0 20px 0 0'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Company Name</h2>
          <p style={{ fontSize: '0.875rem', opacity: '0.9' }}>Owner Dashboard</p>
        </div>

        {/* Navigation */}
        <nav style={{ marginTop: '16px' }}>
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '16px 24px',
                background: location.pathname.includes(item.path) ? COLORS.teal.gradient : 'transparent',
                color: location.pathname.includes(item.path) ? COLORS.white : COLORS.text,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                fontWeight: location.pathname.includes(item.path) ? '600' : '400'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <header style={{ 
          background: COLORS.cardBackground, 
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: '20px 32px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '600', 
              color: COLORS.text 
            }}>
              {menuItems.find(item => location.pathname.includes(item.path))?.label || 'Dashboard'}
            </h1>
          </div>
        </header>

        <main style={{ padding: '0 32px 32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const metrics = {
    activeJobs: 12,
    totalApplications: 156,
    upcomingEvents: 3,
    conversionRate: '15.4%'
  };

  const recentActivity = [
    { id: 1, message: 'New application received for Senior Developer position' },
    { id: 2, message: 'Tech Talk event scheduled for next week' },
    { id: 3, message: 'Frontend Developer position posted' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px' 
      }}>
        <MetricCard title="Active Job Postings" value={metrics.activeJobs} color={COLORS.teal.dark} />
        <MetricCard title="Total Applications" value={metrics.totalApplications} color={COLORS.blue.dark} />
        <MetricCard title="Upcoming Events" value={metrics.upcomingEvents} color={COLORS.teal.dark} />
        <MetricCard title="Conversion Rate" value={metrics.conversionRate} color={COLORS.blue.dark} />
      </div>

      {/* Quick Actions */}
      <div style={{ 
        background: COLORS.cardBackground,
        borderRadius: '20px', 
        padding: '24px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: COLORS.text
        }}>Quick Actions</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          <QuickActionButton label="Post New Job" />
          <QuickActionButton label="Schedule Event" />
          <QuickActionButton label="Review Applications" />
          <QuickActionButton label="View Analytics" />
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ 
        background: COLORS.cardBackground,
        borderRadius: '20px', 
        padding: '24px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: COLORS.text
        }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '16px',
                background: COLORS.alternateBackground,
                borderRadius: '12px'
              }}
            >
              <div style={{ flex: 1, color: COLORS.text }}>{activity.message}</div>
              <button style={{ 
                color: COLORS.blue.dark,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const MetricCard = ({ title, value, color }) => (
  <div style={{ 
    background: COLORS.cardBackground,
    padding: '24px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    position: 'relative',
    overflow: 'hidden',
    border: 'none'
  }}>
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: color === COLORS.teal.dark ? COLORS.teal.gradient : COLORS.blue.gradient
    }} />
    <div style={{ marginBottom: '12px' }}>
      <h3 style={{ 
        color: color === COLORS.teal.dark ? COLORS.teal.dark : COLORS.blue.dark,
        fontSize: '1.1rem', 
        fontWeight: '500' 
      }}>{title}</h3>
    </div>
    <p style={{ 
      fontSize: '2.5rem', 
      fontWeight: '700', 
      color: COLORS.text,
      marginTop: '8px',
      background: color === COLORS.teal.dark ? COLORS.teal.gradient : COLORS.blue.gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}>{value}</p>
  </div>
);

const QuickActionButton = ({ label }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 24px',
        background: isHovered ? COLORS.buttonHoverGradient : COLORS.buttonGradient,
        color: COLORS.white,
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        boxShadow: isHovered 
          ? '0 4px 12px rgba(0,128,128,0.2)'
          : '0 2px 8px rgba(0,128,128,0.1)',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)'
      }}>
      <span>{label}</span>
    </button>
  );
};

// Other Dashboard Sections (Placeholder components)
const JobManagement = () => (
  <div style={{ padding: '24px' }}>
    <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600' }}>Job Management</h2>
    {/* Job management implementation */}
  </div>
);

const EventManagement = () => (
  <div style={{ padding: '24px' }}>
    <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600' }}>Event Management</h2>
    {/* Event management implementation */}
  </div>
);

const ApplicationsManagement = () => (
  <div style={{ padding: '24px' }}>
    <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600' }}>Applications</h2>
    {/* Applications management implementation */}
  </div>
);

const Analytics = () => (
  <div style={{ padding: '24px' }}>
    <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600' }}>Analytics</h2>
    {/* Analytics implementation */}
  </div>
);

const CompanyProfile = () => (
  <div style={{ padding: '24px' }}>
    <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600' }}>Company Profile</h2>
    {/* Company profile implementation */}
  </div>
);

export default OwnerDashboard;