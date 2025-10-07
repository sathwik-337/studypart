import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../../../theme/colors';

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
      {/* Sidebar Navigation */}
      <div style={{ 
        width: '280px', 
        background: COLORS.cardBackground,
        boxShadow: '2px 0 12px rgba(0,0,0,0.1)',
        borderRadius: '0 20px 20px 0'
      }}>
        {/* Company Logo/Profile Section */}
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

        {/* Navigation Menu */}
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
                fontWeight: location.pathname.includes(item.path) ? '600' : '400',
                borderLeft: location.pathname.includes(item.path) 
                  ? '4px solid transparent'
                  : '4px solid transparent',
                backgroundClip: location.pathname.includes(item.path) ? 'padding-box' : 'border-box'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Top Header */}
        <header style={{ 
          background: COLORS.cardBg, 
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
            {/* User Profile/Settings Menu can be added here */}
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '0 32px 32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;