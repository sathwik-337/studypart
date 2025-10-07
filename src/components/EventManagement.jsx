import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EditEvent from './EditEvent';
import ViewEventDetails from './ViewEventDetails';
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
  cardBackground: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)"
};

const EventManagement = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Use the owner-specific endpoint to get only the owner's events
      const response = await fetch(`${API_BASE_URL}/api/v1/events/owner/my-events`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      } else {
        setError('Failed to fetch your events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error loading events');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      console.log('Creating event with data:', eventData);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: eventData.title,
          description: eventData.description,
          event_type: eventData.type.toLowerCase(),
          start_date: `${eventData.date} ${eventData.time}:00`,
          end_date: `${eventData.date} ${eventData.endTime || '23:59'}:00`,
          location: eventData.location,
          is_virtual: eventData.type === 'webinar',
          meeting_link: eventData.type === 'webinar' ? eventData.meetingLink : null,
          capacity: eventData.maxParticipants ? parseInt(eventData.maxParticipants) : null
        })
      });

      const responseData = await response.json();
      console.log('Create event response:', responseData);

      if (response.ok) {
        alert('Event created successfully!');
        await fetchMyEvents(); // Refresh the events list
        navigate('..'); // Navigate back to the events list
        setError(''); // Clear any errors
      } else {
        setError(responseData.message || 'Failed to create event');
        console.error('Failed to create event:', responseData);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Error creating event: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Routes>
        <Route path="/" element={
          <EventList 
            events={events} 
            loading={loading} 
            error={error}
            navigate={navigate} 
          />
        } />
        <Route path="/create" element={
          <CreateEvent 
            onSubmit={handleCreateEvent}
            onCancel={() => navigate('..')}
          />
        } />
        <Route path="/edit/:eventId" element={<EditEvent events={events} setEvents={setEvents} />} />
        <Route path="/view/:eventId" element={<ViewEventDetails events={events} onBack={() => navigate('/owner/events')} />} />
      </Routes>
    </div>
  );
};

const EventList = ({ events, loading, error, navigate }) => {

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ 
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #008080',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '16px', color: COLORS.subText }}>Loading events...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Event Management</h2>
        <button
          onClick={() => navigate('create')}
          style={{
            padding: '12px 24px',
            background: COLORS.teal.gradient,
            color: COLORS.white,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Create New Event
        </button>
      </div>

      {error && (
        <div style={{
          background: '#fee',
          border: '1px solid #fcc',
          color: '#c33',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      {events.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          background: COLORS.cardBackground,
          borderRadius: '12px'
        }}>
          <p style={{ color: COLORS.subText, fontSize: '16px' }}>
            No events found. Create your first event to get started!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {events.map(event => (
          <div
            key={event.id}
            style={{
              background: COLORS.cardBackground,
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>
                  {event.title}
                </h3>
                <p style={{ color: COLORS.subText, marginBottom: '8px' }}>
                  {event.date} at {event.time} | {event.location} | {event.type}
                </p>
                <p style={{ color: COLORS.text, marginBottom: '12px' }}>
                  {event.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '0.875rem' }}>
                  <div>
                    <p style={{ color: COLORS.subText }}>Maximum Participants:</p>
                    <p style={{ color: COLORS.text, fontWeight: '500' }}>{event.maxParticipants}</p>
                  </div>
                  <div>
                    <p style={{ color: COLORS.subText }}>Registration Deadline:</p>
                    <p style={{ color: COLORS.text, fontWeight: '500' }}>{event.registration_deadline || 'No deadline set'}</p>
                  </div>
                  <div>
                    <p style={{ color: COLORS.subText }}>Event Type:</p>
                    <p style={{ color: COLORS.text, fontWeight: '500', textTransform: 'capitalize' }}>
                      {event.event_type}
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    color: COLORS.teal.dark,
                    border: `1px solid ${COLORS.teal.dark}`,
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`edit/${event.id}`)}
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`view/${event.id}`)}
                  style={{
                    padding: '8px 16px',
                    background: COLORS.teal.gradient,
                    color: COLORS.white,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

const CreateEvent = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    type: 'catering',
    description: '',
    maxParticipants: '',
    meetingLink: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>Create New Event</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px'
              }}
              required
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Start Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px'
              }}
              placeholder={formData.type === 'webinar' ? 'Virtual' : 'Enter event location'}
              required
            />
          </div>

          {formData.type === 'webinar' && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Meeting Link</label>
              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px'
                }}
                placeholder="https://zoom.us/j/123456789 or similar"
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Event Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px'
              }}
              placeholder="e.g., Career Fair, Job Interview, Networking Event"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                minHeight: '120px'
              }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Maximum Participants*</label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px'
                }}
                min="1"
                required
                placeholder="e.g., 100"
              />
            </div>


          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Registration Deadline*</label>
            <input
              type="date"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px'
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: COLORS.teal.dark,
                border: `1px solid ${COLORS.teal.dark}`,
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: COLORS.teal.gradient,
                color: COLORS.white,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventManagement;
