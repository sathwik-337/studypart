import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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
  return (
    <div style={{ padding: '24px' }}>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </div>
  );
};

const EventList = () => {
  const navigate = useNavigate();
  const [events] = useState([
    {
      id: 1,
      title: 'Tech Talk Series',
      date: '2025-10-15',
      time: '14:00',
      location: 'Virtual',
      type: 'Webinar',
      maxParticipants: 100,
      registrationDeadline: '2025-10-14',
      remuneration: 0,
      description: 'Join us for an insightful tech talk series...'
    },
    {
      id: 2,
      title: 'Career Fair',
      date: '2025-10-20',
      time: '10:00',
      location: 'Main Campus',
      type: 'In-Person',
      maxParticipants: 500,
      registrationDeadline: '2025-10-18',
      remuneration: 1000,
      description: 'Annual career fair with leading tech companies...'
    }
  ]);

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
                    <p style={{ color: COLORS.text, fontWeight: '500' }}>{event.registrationDeadline}</p>
                  </div>
                  <div>
                    <p style={{ color: COLORS.subText }}>Remuneration:</p>
                    <p style={{ color: COLORS.text, fontWeight: '500' }}>
                      {event.remuneration > 0 
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(event.remuneration)
                        : 'No remuneration'
                      }
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
                >
                  Edit
                </button>
                <button
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
    </div>
  );
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'Virtual',
    description: '',
    maxParticipants: '',
    registrationDeadline: '',
    remuneration: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement event creation logic
    navigate('..');
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
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
              <label style={{ display: 'block', marginBottom: '8px' }}>Time</label>
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
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Event Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px'
              }}
              required
            >
              <option value="Virtual">Virtual</option>
              <option value="In-Person">In-Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
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

            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Remuneration (USD)*</label>
              <input
                type="number"
                name="remuneration"
                value={formData.remuneration}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px'
                }}
                min="0"
                step="100"
                required
                placeholder="e.g., 1000"
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
              onClick={() => navigate('..')}
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
