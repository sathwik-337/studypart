# Student Dashboard - StudyApart

A comprehensive React-based student portal interface for managing job and event applications.

## Features

### 🎯 Main Navigation
- **Dashboard**: Overview statistics and quick actions
- **Browse Jobs**: Job listings with advanced filters
- **Browse Events**: Event listings and registration
- **My Applications**: Track application status

### 📊 Dashboard Overview
- Application statistics (Total, Accepted, Pending, Rejected)
- Quick action buttons
- Recent activity feed

### 💼 Job Management
- Browse job opportunities with filters:
  - Search by title/company
  - Filter by location
  - Filter by job type (Full-time, Part-time, Internship)
- Detailed job cards with requirements
- Professional application modal with cover letter

### 📅 Event Management
- Browse events with filters:
  - Search by name/description
  - Filter by location
- Event registration with additional information
- Capacity tracking

### 📋 Application Tracking
- Combined view of job applications and event registrations
- Status badges (Pending, Accepted, Rejected)
- Application date tracking

## Technical Implementation

### Architecture
- **React 19.2.0** with functional components and hooks
- **React Router Dom 6.30.1** for navigation
- **Tailwind CSS 3.4.18** for styling
- **Framer Motion 12.23.22** for animations

### Custom Hooks
- `useJobs()` - Job data management with filtering
- `useEvents()` - Event data management with filtering  
- `useApplications()` - Application state management
- `useLocalStorage()` - Persistent state storage

### Components
- **StudentDashboard** - Main dashboard component
- **JobApplicationModal** - Professional job application form
- **EventRegistrationModal** - Event registration form
- **Modal** - Reusable modal component

### State Management
- React hooks for local state
- localStorage for tab persistence
- Mock API simulation with loading states

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sathwik-337/studypart.git
cd studypart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000/student-dashboard
```

### Available Routes
- `/` - Homepage
- `/student-dashboard` - Student Dashboard (main feature)
- `/jobs` - Jobs page (placeholder)
- `/login` - Login page (placeholder)
- `/signup` - Signup page (placeholder)

## Usage

### Accessing the Student Dashboard
Navigate to `/student-dashboard` to access the full dashboard interface.

### Dashboard Features
1. **Statistics Overview**: View your application metrics
2. **Browse Jobs**: Search and filter available positions
3. **Apply for Jobs**: Submit applications with cover letters
4. **Browse Events**: Find networking and career events
5. **Register for Events**: Sign up with additional preferences
6. **Track Applications**: Monitor your application status

### Mock Data
The application includes comprehensive mock data for:
- 5 sample job postings across different industries
- 5 sample events (career fairs, workshops, seminars)
- Sample application history with various statuses

## File Structure

```
src/
├── components/
│   ├── Modal.jsx           # Modal components
│   └── Modal.css           # Modal styles
├── hooks/
│   └── useStudentDashboard.js  # Custom hooks
├── pages/
│   ├── StudentDashboard.jsx    # Main dashboard
│   ├── StudentDashboard.css    # Dashboard styles
│   └── Homepage.jsx            # Homepage
├── App.js                      # Main app component
└── index.js                    # Entry point
```

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Future Enhancements

### Recommended Improvements
1. **Real-time Updates**: WebSocket integration for live status updates
2. **Advanced Filtering**: Save filter preferences, date ranges
3. **File Management**: Resume versioning, portfolio uploads
4. **Notifications**: Email/push notifications for status changes
5. **Analytics**: Application success rate tracking

---

**Student Dashboard** - Empowering students to manage their career journey effectively! 🎓
