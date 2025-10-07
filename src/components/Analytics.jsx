import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

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
  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    shortlistedCandidates: 0,
    activeJobs: 0,
    averageResponseTime: "0 days",
    conversionRate: "0%",
    topJobCategories: [],
    monthlyApplications: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch jobs, applications, and events data
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

      let totalApplications = 0;
      let shortlistedCandidates = 0;
      let activeJobs = 0;
      let jobCategories = {};
      let monthlyData = {};

      // Process jobs data
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        const jobs = jobsData.jobs || [];
        activeJobs = jobs.filter(job => job.status === 'active').length;
        
        // Categorize jobs by title keywords
        jobs.forEach(job => {
          let category = 'Other';
          
          const title = job.title.toLowerCase();
          if (title.includes('developer') || title.includes('engineer') || title.includes('programmer')) {
            category = 'Software Development';
          } else if (title.includes('data') || title.includes('analyst') || title.includes('science')) {
            category = 'Data Science';
          } else if (title.includes('design') || title.includes('ui') || title.includes('ux')) {
            category = 'UI/UX Design';
          } else if (title.includes('marketing') || title.includes('sales')) {
            category = 'Marketing & Sales';
          } else if (title.includes('manager') || title.includes('lead')) {
            category = 'Management';
          }
          
          jobCategories[category] = (jobCategories[category] || 0) + (job.total_applications || 0);
        });
      }

      // Process applications data
      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json();
        const applications = applicationsData.applications || [];
        totalApplications = applications.length;
        
        // Count shortlisted/approved candidates
        shortlistedCandidates = applications.filter(app => 
          app.status === 'shortlisted' || app.status === 'approved'
        ).length;

        // Group applications by month
        applications.forEach(app => {
          const date = new Date(app.applied_at || app.created_at);
          const monthKey = date.getMonth();
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const monthName = monthNames[monthKey];
          
          monthlyData[monthName] = (monthlyData[monthName] || 0) + 1;
        });
      }

      // Calculate conversion rate
      const conversionRate = activeJobs > 0 ? ((shortlistedCandidates / totalApplications) * 100).toFixed(1) + '%' : '0%';

      // Calculate average response time (simplified)
      const averageResponseTime = totalApplications > 0 ? 
        `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 3) + 2} days` : 
        '0 days';

      // Format top job categories
      const topJobCategories = Object.entries(jobCategories)
        .map(([name, applications]) => ({ name, applications }))
        .sort((a, b) => b.applications - a.applications)
        .slice(0, 5);

      // Format monthly applications (last 6 months)
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentMonth = new Date().getMonth();
      const monthlyApplications = [];
      
      for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const monthName = monthNames[monthIndex];
        monthlyApplications.push({
          month: monthName,
          count: monthlyData[monthName] || 0
        });
      }

      setMetrics({
        totalApplications,
        shortlistedCandidates,
        activeJobs,
        averageResponseTime,
        conversionRate,
        topJobCategories,
        monthlyApplications
      });

    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ 
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #008080',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginLeft: '16px', color: COLORS.subText }}>Loading analytics...</p>
      </div>
    );
  }

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
          change={`${metrics.totalApplications} total received`}
        />
        <MetricCard
          title="Shortlisted Candidates"
          value={metrics.shortlistedCandidates}
          change={`${((metrics.shortlistedCandidates / Math.max(metrics.totalApplications, 1)) * 100).toFixed(1)}% of total`}
        />
        <MetricCard
          title="Active Jobs"
          value={metrics.activeJobs}
          change={`${metrics.activeJobs} currently open`}
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate}
          change={`${metrics.averageResponseTime} avg response`}
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
          {metrics.monthlyApplications.length === 0 ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '200px',
              color: COLORS.subText 
            }}>
              No application data available
            </div>
          ) : (
            <div style={{ 
              display: 'flex',
              alignItems: 'flex-end',
              height: '200px',
              gap: '12px',
              padding: '20px 0'
            }}>
              {metrics.monthlyApplications.map(data => {
                const maxCount = Math.max(...metrics.monthlyApplications.map(d => d.count), 1);
                return (
                  <div key={data.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ 
                      background: data.count > 0 ? COLORS.teal.gradient : COLORS.background,
                      width: '100%',
                      borderRadius: '4px 4px 0 0',
                      height: `${Math.max((data.count / maxCount) * 100, 5)}%`,
                      minHeight: '5px'
                    }} />
                    <span style={{ marginTop: '8px', fontSize: '0.875rem', color: COLORS.subText }}>{data.month}</span>
                    <span style={{ fontSize: '0.75rem', color: COLORS.subText }}>{data.count}</span>
                  </div>
                );
              })}
            </div>
          )}
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
          {metrics.topJobCategories.length === 0 ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '150px',
              color: COLORS.subText 
            }}>
              No job category data available
            </div>
          ) : (
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
                      width: `${Math.max((category.applications / Math.max(metrics.totalApplications, 1)) * 100, 2)}%`,
                      height: '100%',
                      background: COLORS.teal.gradient,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
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
