import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CreateJobPost from '../components/CreateJobPost';
import EditJobPost from '../components/EditJobPost';

const JobManagement = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      description: 'Looking for an experienced software engineer...',
      requirements: '5+ years of experience in full-stack development',
      location: 'New York, NY (Hybrid)',
      salary: 120000,
      jobType: 'full-time',
      status: 'active',
      postedDate: '2025-10-01'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      description: 'Creative designer needed for our product team...',
      requirements: '3+ years of UI/UX design experience',
      location: 'Remote',
      salary: 95000,
      jobType: 'full-time',
      status: 'active',
      postedDate: '2025-10-03'
    }
  ]);

  const handleCreateJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: jobs.length + 1,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, newJob]);
    navigate('/owner-dashboard/jobs');
  };

  const handleEditJob = (jobData) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobData.id ? { ...jobData, postedDate: job.postedDate } : job
    );
    setJobs(updatedJobs);
    navigate('/owner-dashboard/jobs');
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
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
            
            <div className="grid gap-6">
              {jobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="capitalize">{job.jobType}</span>
                        <span>•</span>
                        <span>{formatSalary(job.salary)}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
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
                    <span className="text-sm text-gray-500">Posted on {job.postedDate}</span>
                    <div className="flex gap-2">
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
          </div>
        }
      />
      <Route
        path="create"
        element={
          <CreateJobPost
            onSubmit={handleCreateJob}
            onCancel={() => navigate('/owner-dashboard/jobs')}
          />
        }
      />
      <Route
        path="edit/:jobId"
        element={
          <EditJobPost
            jobs={jobs}
            onSubmit={handleEditJob}
            onCancel={() => navigate('/owner-dashboard/jobs')}
          />
        }
      />
    </Routes>
  );
};

export default JobManagement;