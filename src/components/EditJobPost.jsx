import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditJobPost = ({ jobs, onSubmit, onCancel }) => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    status: 'active'
  });

  useEffect(() => {
    const job = jobs.find(j => j.id === parseInt(jobId));
    if (job) {
      setJobData(job);
    }
  }, [jobId, jobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(jobData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Job Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title*</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description*</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="Describe the role, responsibilities, and expectations..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Requirements*</label>
          <textarea
            name="requirements"
            value={jobData.requirements}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="List required skills, qualifications, and experience..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location*</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="e.g., New York, NY (Remote/Hybrid/On-site)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary*</label>
          <input
            type="number"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="e.g., 75000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type*</label>
          <select
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status*</label>
          <select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobPost;