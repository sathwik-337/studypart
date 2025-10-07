// Allow overriding the API base URL at build time via REACT_APP_API_BASE_URL.
// This is the recommended way when building the frontend for Render (or Vercel)
// because Render exposes env vars at build time and CRA only exposes vars that
// begin with REACT_APP_. If REACT_APP_API_BASE_URL is not set, fall back to the
// previous NODE_ENV-based defaults.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || (process.env.NODE_ENV === 'production'
  ? 'https://your-production-domain.com'
  : 'http://localhost:5000');

export default API_BASE_URL;
export const API_ENDPOINTS = {
  // Auth
  signup: '/api/v1/auth/register',
  login: '/api/v1/auth/login',
  
  // Student Registration (for approval system)
  studentSignup: '/api/v1/student-registration/request',
  
  // Colleges (if needed)
  colleges: '/api/v1/colleges',
  
  // Admin
  pendingStudents: '/api/v1/student-registration/requests',
  approveStudent: '/api/v1/student-registration/approve',
  rejectStudent: '/api/v1/student-registration/reject',
  getPdf: '/api/v1/student-registration/pdf',
  
  // Jobs
  jobs: '/api/v1/jobs',
  jobsByOwner: '/api/v1/jobs/owner',
  
  // Events
  events: '/api/v1/events',
  eventsByOwner: '/api/events/owner',
  
  // Applications
  jobApplications: '/api/job-applications',
  eventApplications: '/api/event-applications',
  
  // Reports
  acceptedStudentsPdf: '/api/reports/owner',
  eventAcceptedStudentsPdf: '/api/reports/event',
  jobAcceptedStudentsPdf: '/api/reports/job',
};
