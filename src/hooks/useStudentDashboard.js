// Custom hooks for Student Dashboard
import { useState, useEffect } from 'react';

// Hook for managing application state
export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addApplication = (application) => {
    const newApplication = {
      ...application,
      id: Date.now(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setApplications(prev => [...prev, newApplication]);
    return newApplication;
  };

  const updateApplicationStatus = (id, status) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status } : app
      )
    );
  };

  return {
    applications,
    setApplications,
    addApplication,
    updateApplicationStatus,
    loading,
    setLoading,
    error,
    setError
  };
};

// Hook for managing jobs data
export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in real app, this would be an API call
      const mockJobs = [
        {
          id: 1,
          title: "Software Engineer Intern",
          company: "Tech Corp",
          location: "San Francisco, CA",
          type: "Internship",
          description: "Join our team as a software engineering intern and work on cutting-edge projects.",
          requirements: ["JavaScript", "React", "Node.js"],
          salary: "$25-30/hour",
          posted: "2025-10-01"
        },
        {
          id: 2,
          title: "Data Analyst",
          company: "Data Solutions Inc",
          location: "New York, NY",
          type: "Full-time",
          description: "Analyze large datasets to drive business decisions and create insightful reports.",
          requirements: ["Python", "SQL", "Tableau"],
          salary: "$65,000-75,000",
          posted: "2025-09-28"
        },
        {
          id: 3,
          title: "UI/UX Designer",
          company: "Design Studio",
          location: "Remote",
          type: "Part-time",
          description: "Create beautiful and intuitive user interfaces for web and mobile applications.",
          requirements: ["Figma", "Adobe Creative Suite", "User Research"],
          salary: "$30-40/hour",
          posted: "2025-09-25"
        },
        {
          id: 4,
          title: "Marketing Coordinator",
          company: "Growth Marketing Co",
          location: "Chicago, IL",
          type: "Full-time",
          description: "Coordinate marketing campaigns and analyze performance metrics.",
          requirements: ["Marketing", "Analytics", "Social Media"],
          salary: "$45,000-55,000",
          posted: "2025-09-22"
        },
        {
          id: 5,
          title: "DevOps Engineer",
          company: "Cloud Systems",
          location: "Seattle, WA",
          type: "Full-time",
          description: "Manage cloud infrastructure and implement CI/CD pipelines.",
          requirements: ["AWS", "Docker", "Kubernetes"],
          salary: "$80,000-95,000",
          posted: "2025-09-20"
        }
      ];
      
      // Apply filters
      let filteredJobs = mockJobs;
      
      if (filters.search) {
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.location) {
        filteredJobs = filteredJobs.filter(job =>
          job.location.includes(filters.location)
        );
      }
      
      if (filters.type) {
        filteredJobs = filteredJobs.filter(job =>
          job.type === filters.type
        );
      }
      
      setJobs(filteredJobs);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    error,
    fetchJobs
  };
};

// Hook for managing events data
export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data - in real app, this would be an API call
      const mockEvents = [
        {
          id: 1,
          name: "Tech Career Fair 2025",
          date: "2025-11-15",
          time: "10:00 AM - 4:00 PM",
          location: "University Convention Center",
          description: "Meet with top tech companies and explore career opportunities in the technology sector.",
          organizer: "Career Services",
          capacity: 500,
          registered: 234
        },
        {
          id: 2,
          name: "Networking Workshop",
          date: "2025-10-20",
          time: "2:00 PM - 5:00 PM",
          location: "Business Building Room 201",
          description: "Learn effective networking strategies for your career advancement.",
          organizer: "Professional Development",
          capacity: 50,
          registered: 32
        },
        {
          id: 3,
          name: "Resume Building Seminar",
          date: "2025-10-25",
          time: "1:00 PM - 3:00 PM",
          location: "Student Center Auditorium",
          description: "Get expert tips on creating a standout resume that gets noticed by employers.",
          organizer: "Career Services",
          capacity: 100,
          registered: 67
        },
        {
          id: 4,
          name: "Startup Pitch Competition",
          date: "2025-11-02",
          time: "6:00 PM - 9:00 PM",
          location: "Innovation Hub",
          description: "Watch student entrepreneurs pitch their innovative ideas to industry experts.",
          organizer: "Entrepreneurship Center",
          capacity: 200,
          registered: 156
        },
        {
          id: 5,
          name: "Industry Panel: Future of AI",
          date: "2025-11-08",
          time: "3:00 PM - 5:00 PM",
          location: "Engineering Auditorium",
          description: "Learn about the future of artificial intelligence from industry leaders.",
          organizer: "Computer Science Department",
          capacity: 300,
          registered: 278
        }
      ];
      
      // Apply filters
      let filteredEvents = mockEvents;
      
      if (filters.search) {
        filteredEvents = filteredEvents.filter(event =>
          event.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.location) {
        filteredEvents = filteredEvents.filter(event =>
          event.location.includes(filters.location)
        );
      }
      
      setEvents(filteredEvents);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents
  };
};

// Hook for localStorage persistence
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};