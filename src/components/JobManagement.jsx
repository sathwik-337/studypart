import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CreateJobPost from '../components/CreateJobPost';
import EditJobPost from '../components/EditJobPost';
import API_BASE_URL from '../config/api';

const JobManagement = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/jobs/owner/my-jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      } else {
        setError('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Error loading jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (jobData) => {
    try {
      console.log('Creating job with data:', jobData);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/jobs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: jobData.title,
          description: jobData.description,
          requirements: jobData.requirements,
          job_type: jobData.jobType,
          location: jobData.location,
          salary_min: jobData.salary ? parseInt(jobData.salary) - 10000 : null,
          salary_max: jobData.salary ? parseInt(jobData.salary) + 10000 : null,
          is_remote: jobData.location?.toLowerCase().includes('remote') || false
        })
      });

      const responseData = await response.json();
      console.log('Create job response:', responseData);

      if (response.ok) {
        alert('Job created successfully!');
        await fetchMyJobs(); // Refresh the jobs list
        navigate('..'); // Navigate back to the jobs list (go up one level from create)
        setError(''); // Clear any errors
      } else {
        setError(responseData.message || 'Failed to create job');
        console.error('Failed to create job:', responseData);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      setError('Error creating job: ' + error.message);
    }
  };

  const handleEditJob = async (jobData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: jobData.title,
          description: jobData.description,
          requirements: jobData.requirements,
          job_type: jobData.jobType,
          location: jobData.location,
          status: jobData.status
        })
      });

      if (response.ok) {
        await fetchMyJobs(); // Refresh the jobs list
        navigate('/owner-dashboard/jobs');
      } else {
        setError('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Error updating job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          await fetchMyJobs(); // Refresh the jobs list
        } else {
          setError('Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        setError('Error deleting job');
      }
    }
  };

  const handleDownloadPDF = async (jobId, jobTitle) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/approved-students/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSalary = (salaryMin, salaryMax) => {
    if (!salaryMin && !salaryMax) return 'Salary not specified';
    if (salaryMin && salaryMax) return `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()}`;
    if (salaryMin) return `From $${salaryMin.toLocaleString()}`;
    if (salaryMax) return `Up to $${salaryMax.toLocaleString()}`;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Job Management</h1>
              <button
                onClick={() => navigate('create')}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Create New Job
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                <p className="mt-2 text-gray-600">Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No jobs posted yet. Create your first job posting!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span className="capitalize">{job.job_type}</span>
                          <span>•</span>
                          <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>

                    {/* Application Statistics */}
                    <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{job.total_applications || 0}</div>
                        <div className="text-sm text-gray-600">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{job.pending_applications || 0}</div>
                        <div className="text-sm text-gray-600">Pending</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{job.accepted_applications || 0}</div>
                        <div className="text-sm text-gray-600">Accepted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{job.rejected_applications || 0}</div>
                        <div className="text-sm text-gray-600">Rejected</div>
                      </div>
                    </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-gray-600">{job.description}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
                    <p className="text-gray-600">{job.requirements}</p>
                  </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">Posted on {new Date(job.created_at).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`applications/${job.id}`)}
                          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          View Applications ({job.total_applications || 0})
                        </button>
                        {job.accepted_applications > 0 && (
                          <button
                            onClick={() => handleDownloadPDF(job.id, job.title)}
                            className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            Download PDF
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`edit/${job.id}`)}
                          className="px-4 py-2 text-sm border border-teal-600 text-teal-600 rounded hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="px-4 py-2 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        }
      />
      <Route
        path="create"
        element={
          <CreateJobPost
            onSubmit={handleCreateJob}
            onCancel={() => navigate('..')}
          />
        }
      />
      <Route
        path="edit/:jobId"
        element={
          <EditJobPost
            jobs={jobs}
            onSubmit={handleEditJob}
            onCancel={() => navigate('..')}
          />
        }
      />
      <Route
        path="applications/:jobId"
        element={<JobApplicationsView />}
      />
    </Routes>
  );
};

// Job Applications View Component
const JobApplicationsView = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      } else {
        setError('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Error loading applications');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, status, notes = '') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, reviewer_notes: notes })
      });

      if (response.ok) {
        await fetchApplications(); // Refresh applications
      } else {
        setError('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      setError('Error updating application');
    }
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => navigate('/owner-dashboard/jobs')}
            className="text-teal-600 hover:text-teal-800 mb-2"
          >
            ← Back to Jobs
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-2 text-gray-600">Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No applications found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredApplications.map(application => (
            <div key={application.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {application.first_name} {application.last_name}
                  </h3>
                  <p className="text-gray-600">{application.email}</p>
                  {application.phone && <p className="text-gray-600">{application.phone}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>

              {application.cover_letter && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded">{application.cover_letter}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  Applied on {new Date(application.applied_at).toLocaleDateString()}
                </span>
                
                {application.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'accepted')}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'rejected')}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
                
                {application.status === 'shortlisted' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'accepted')}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'rejected')}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobManagement;