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
  text: "#1B263B",
  subText: "#4A5A6A",
  border: "#E3E7EB",
  cardBackground: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)",
  success: "#27AE60",
  danger: "#E74C3C",
  gray: "#95A5A6",
  lightGray: "#BDC3C7"
};

const ApplicationReview = () => {
  const [filter, setFilter] = useState('all');
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState('all');

  useEffect(() => {
    fetchOwnerJobs();
  }, []);

  const fetchOwnerJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // First get owner's jobs
      const jobsResponse = await fetch(`${API_BASE_URL}/api/v1/jobs/owner/my-jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        setJobs(jobsData.jobs || []);
        
        // Then get applications for all jobs
        const allApplications = [];
        for (const job of jobsData.jobs || []) {
          const applicationsResponse = await fetch(
            `${API_BASE_URL}/api/v1/jobs/${job.id}/applications`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (applicationsResponse.ok) {
            const applicationsData = await applicationsResponse.json();
            const jobApplications = (applicationsData.applications || []).map(app => ({
              ...app,
              job_title: job.title,
              job_id: job.id
            }));
            allApplications.push(...jobApplications);
          }
        }
        
        setApplications(allApplications);
      } else {
        setError('Failed to fetch jobs and applications');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error loading applications');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, jobId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_BASE_URL}/api/v1/jobs/${jobId}/applications/${applicationId}/status`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      );

      if (response.ok) {
        await fetchOwnerJobs(); // Refresh data
      } else {
        setError('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Error updating application');
    }
  };

  const downloadJobPDF = async (jobId, jobTitle) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_BASE_URL}/api/v1/jobs/${jobId}/approved-students/pdf`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `approved-students-${jobTitle.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setError('Error downloading PDF');
    }
  };

  const filteredApplications = applications.filter(app => {
    const statusMatch = filter === 'all' || app.status === filter;
    const jobMatch = selectedJob === 'all' || app.job_id === parseInt(selectedJob);
    return statusMatch && jobMatch;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchOwnerJobs}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'approved':
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
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            style={{
              padding: '8px 16px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              background: COLORS.white
            }}
          >
            <option value="all">All Jobs</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
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
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* PDF Download Section */}
      {jobs.length > 0 && (
        <div style={{ 
          background: COLORS.cardBackground,
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', fontWeight: '600' }}>
            Download Approved Students Report
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {jobs.map(job => {
              const approvedCount = applications.filter(app => 
                app.job_id === job.id && app.status === 'approved'
              ).length;
              
              return (
                <button
                  key={job.id}
                  onClick={() => downloadJobPDF(job.id, job.title)}
                  disabled={approvedCount === 0}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: approvedCount > 0 ? COLORS.success : COLORS.lightGray,
                    color: approvedCount > 0 ? COLORS.white : COLORS.gray,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: approvedCount > 0 ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  {job.title} ({approvedCount} approved)
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredApplications.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            background: COLORS.cardBackground,
            borderRadius: '12px'
          }}>
            <p style={{ color: COLORS.gray, fontSize: '16px' }}>
              No applications found for the selected filters.
            </p>
          </div>
        ) : (
          filteredApplications.map(application => (
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
                  {application.full_name || application.name}
                </h3>
                <p style={{ color: COLORS.subText, marginBottom: '4px' }}>
                  Job: {application.job_title}
                </p>
                <p style={{ color: COLORS.subText, marginBottom: '4px' }}>
                  Email: {application.email}
                </p>
                <p style={{ color: COLORS.subText, marginBottom: '4px' }}>
                  Phone: {application.phone}
                </p>
                <p style={{ color: COLORS.subText }}>
                  Applied: {new Date(application.applied_at || application.created_at).toLocaleDateString()}
                </p>
                {application.cover_letter && (
                  <p style={{ color: COLORS.subText, marginTop: '8px' }}>
                    Cover Letter: {application.cover_letter.substring(0, 100)}...
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                <span style={{ 
                  color: getStatusColor(application.status),
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  padding: '4px 12px',
                  backgroundColor: `${getStatusColor(application.status)}20`,
                  borderRadius: '20px',
                  fontSize: '14px'
                }}>
                  {application.status}
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {application.resume_url && (
                    <a
                      href={application.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 12px',
                        background: COLORS.teal.gradient,
                        color: COLORS.white,
                        border: 'none',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '14px'
                      }}
                    >
                      View Resume
                    </a>
                  )}
                  {application.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateApplicationStatus(application.id, application.job_id, 'approved')}
                        style={{
                          padding: '6px 12px',
                          background: COLORS.success,
                          color: COLORS.white,
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(application.id, application.job_id, 'rejected')}
                        style={{
                          padding: '6px 12px',
                          background: COLORS.danger,
                          color: COLORS.white,
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationReview;
