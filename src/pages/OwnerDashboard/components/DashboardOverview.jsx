import React from 'react';
import { COLORS } from '../../../theme/colors';

const DashboardOverview = () => {
  // Sample data - would come from API in production
  const metrics = {
    activeJobs: 12,
    totalApplications: 156,
    upcomingEvents: 3,
    conversionRate: '15.4%'
  };

  const recentActivity = [
    { id: 1, type: 'application', message: 'New application received for Senior Developer position' },
    { id: 2, type: 'event', message: 'Tech Talk event scheduled for next week' },
    { id: 3, type: 'job', message: 'Frontend Developer position posted' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px' 
      }}>
        <MetricCard
          title="Active Job Postings"
          value={metrics.activeJobs}
          color={COLORS.teal.dark}
        />
        <MetricCard
          title="Total Applications"
          value={metrics.totalApplications}
          color={COLORS.blue.dark}
        />
        <MetricCard
          title="Upcoming Events"
          value={metrics.upcomingEvents}
          color={COLORS.teal.dark}
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate}
          color={COLORS.blue.dark}
        />
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
          color: COLORS.text,
          position: 'relative',
          display: 'inline-block'
        }}>
          <span style={{
            position: 'absolute',
            bottom: '-4px',
            left: 0,
            width: '40%',
            height: '2px',
            background: COLORS.teal.gradient
          }}></span>
          Quick Actions
        </h2>
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
          color: COLORS.text,
          position: 'relative',
          display: 'inline-block'
        }}>
          <span style={{
            position: 'absolute',
            bottom: '-4px',
            left: 0,
            width: '40%',
            height: '2px',
            background: COLORS.blue.gradient
          }}></span>
          Recent Activity
        </h2>
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

// Helper Components
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
  const [isHovered, setIsHovered] = React.useState(false);
  
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

export default DashboardOverview;