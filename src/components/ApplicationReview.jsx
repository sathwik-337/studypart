import React, { useState } from 'react';

const COLORS = {
  white: "#FFFFFF",
  background: "#F4F6FB",
  teal: {
    light: "#3CB371",
    dark: "#008080",
    gradient: "linear-gradient(135deg, #3CB371 0%, #008080 100%)"
  },
  text: "#1B263B",
  subText: "#4A5A6A",
  border: "#E3E7EB",
  cardBackground: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)"
};

const ApplicationReview = () => {
  const [filter, setFilter] = useState('all');
  const [applications] = useState([
    {
      id: 1,
      name: 'John Doe',
      position: 'Senior Developer',
      appliedDate: '2025-10-01',
      experience: '5 years',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Frontend Developer',
      appliedDate: '2025-10-03',
      experience: '3 years',
      status: 'shortlisted'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'Backend Developer',
      appliedDate: '2025-10-04',
      experience: '4 years',
      status: 'rejected'
    }
  ]);

  const filterApplications = () => {
    if (filter === 'all') return applications;
    return applications.filter(app => app.status === filter);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'shortlisted':
        return '#27AE60';
      case 'rejected':
        return '#E74C3C';
      default:
        return COLORS.text;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Application Review</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '8px 16px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              background: COLORS.white
            }}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filterApplications().map(application => (
          <div
            key={application.id}
            style={{
              background: COLORS.cardBackground,
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>
                  {application.name}
                </h3>
                <p style={{ color: COLORS.subText, marginBottom: '4px' }}>
                  Position: {application.position}
                </p>
                <p style={{ color: COLORS.subText, marginBottom: '4px' }}>
                  Experience: {application.experience}
                </p>
                <p style={{ color: COLORS.subText }}>
                  Applied: {application.appliedDate}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                <span style={{ 
                  color: getStatusColor(application.status),
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {application.status}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      padding: '8px 16px',
                      background: COLORS.teal.gradient,
                      color: COLORS.white,
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>
                  <button
                    style={{
                      padding: '8px 16px',
                      background: 'transparent',
                      color: COLORS.teal.dark,
                      border: `1px solid ${COLORS.teal.dark}`,
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationReview;
