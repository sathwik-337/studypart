// API Configuration for StudyPart Frontend
const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Authentication endpoints
  login: '/api/v1/auth/login',
  signup: '/api/v1/auth/register',
  
  // Student registration endpoints (approval system)
  studentSignup: '/api/v1/student-registration/request',
  studentRequests: '/api/v1/student-registration/requests',
  approveStudent: '/api/v1/student-registration/requests',
  rejectStudent: '/api/v1/student-registration/requests',
  
  // User endpoints
  profile: '/api/v1/users/profile',
  updateProfile: '/api/v1/users/profile',
  
  // Jobs endpoints
  jobs: '/api/v1/jobs',
  jobsById: (id) => `/api/v1/jobs/${id}`,
  jobApplications: '/api/v1/applications',
  
  // Events endpoints
  events: '/api/v1/events',
  eventsById: (id) => `/api/v1/events/${id}`,
  eventRegistrations: '/api/v1/events/register',
  
  // Company endpoints
  companies: '/api/v1/companies',
  companiesById: (id) => `/api/v1/companies/${id}`,
  
  // Admin endpoints
  adminUsers: '/api/v1/admin/users',
  adminStats: '/api/v1/admin/stats',
};

export default API_BASE_URL;