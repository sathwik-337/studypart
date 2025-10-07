import React from 'react';

const COLORS = {
  white: "#FFFFFF",
  background: "#F4F6FB",
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
  text: "#1B263B",
  subText: "#4A5A6A",
  border: "#E3E7EB",
  cardBackground: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)"
};

const Analytics = () => {
  const metrics = {
    totalApplications: 156,
    shortlistedCandidates: 45,
    activeJobs: 12,
    averageResponseTime: "2.5 days",
    conversionRate: "15.4%",
    topJobCategories: [
      { name: "Software Development", applications: 78 },
      { name: "Data Science", applications: 45 },
      { name: "UI/UX Design", applications: 33 }
    ],
    monthlyApplications: [
      { month: "May", count: 25 },
      { month: "Jun", count: 32 },
      { month: "Jul", count: 28 },
      { month: "Aug", count: 45 },
      { month: "Sep", count: 56 }
    ]
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600',
        marginBottom: '24px'
      }}>Analytics Dashboard</h2>

      {/* Key Metrics */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <MetricCard
          title="Total Applications"
          value={metrics.totalApplications}
          change="+12% vs last month"
        />
        <MetricCard
          title="Shortlisted Candidates"
          value={metrics.shortlistedCandidates}
          change="+8% vs last month"
        />
        <MetricCard
          title="Active Jobs"
          value={metrics.activeJobs}
          change="+2 new this month"
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate}
          change="+2.1% vs last month"
        />
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Monthly Applications Chart */}
        <div style={{
          background: COLORS.cardBackground,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>
            Monthly Applications
          </h3>
          <div style={{ 
            display: 'flex',
            alignItems: 'flex-end',
            height: '200px',
            gap: '12px',
            padding: '20px 0'
          }}>
            {metrics.monthlyApplications.map(data => (
              <div key={data.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                  background: COLORS.teal.gradient,
                  width: '100%',
                  borderRadius: '4px 4px 0 0',
                  height: `${(data.count / 60) * 100}%`  // max height based on highest value
                }} />
                <span style={{ marginTop: '8px', fontSize: '0.875rem', color: COLORS.subText }}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Job Categories */}
        <div style={{
          background: COLORS.cardBackground,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>
            Top Job Categories
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {metrics.topJobCategories.map(category => (
              <div key={category.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: COLORS.text }}>{category.name}</span>
                  <span style={{ color: COLORS.subText }}>{category.applications} applications</span>
                </div>
                <div style={{ 
                  width: '100%',
                  height: '8px',
                  background: COLORS.background,
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(category.applications / metrics.totalApplications) * 100}%`,
                    height: '100%',
                    background: COLORS.teal.gradient,
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div style={{
        background: COLORS.cardBackground,
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>
          Performance Metrics
        </h3>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          <PerformanceMetric
            label="Average Response Time"
            value={metrics.averageResponseTime}
            change="-0.5 days"
            isPositive={true}
          />
          <PerformanceMetric
            label="Application Success Rate"
            value="68%"
            change="+5%"
            isPositive={true}
          />
          <PerformanceMetric
            label="Interview Completion Rate"
            value="92%"
            change="+2%"
            isPositive={true}
          />
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change }) => (
  <div style={{
    background: COLORS.cardBackground,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  }}>
    <h3 style={{ fontSize: '1rem', color: COLORS.text, marginBottom: '12px' }}>{title}</h3>
    <div style={{ fontSize: '2rem', fontWeight: '600', color: COLORS.text, marginBottom: '8px' }}>
      {value}
    </div>
    <div style={{ fontSize: '0.875rem', color: COLORS.subText }}>{change}</div>
  </div>
);

const PerformanceMetric = ({ label, value, change, isPositive }) => (
  <div>
    <div style={{ fontSize: '0.875rem', color: COLORS.subText, marginBottom: '8px' }}>{label}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: COLORS.text, marginBottom: '4px' }}>
      {value}
    </div>
    <div style={{ 
      fontSize: '0.875rem',
      color: isPositive ? '#27AE60' : '#E74C3C'
    }}>
      {change}
    </div>
  </div>
);

export default Analytics;
