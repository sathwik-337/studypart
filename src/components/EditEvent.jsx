import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = ({ events, setEvents }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
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

  useEffect(() => {
    const event = events.find(e => e.id === parseInt(eventId));
    if (event) {
      setFormData(event);
    }
  }, [eventId, events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvents = events.map(event => 
      event.id === parseInt(eventId) ? { ...formData, id: event.id } : event
    );
    setEvents(updatedEvents);
    navigate('/owner/events');
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>Edit Event</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Event Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #E3E7EB',
                borderRadius: '8px'
              }}
              required
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #E3E7EB',
                  borderRadius: '8px'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Time*</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #E3E7EB',
                  borderRadius: '8px'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #E3E7EB',
                borderRadius: '8px'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Event Type*</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #E3E7EB',
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
            <label style={{ display: 'block', marginBottom: '8px' }}>Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #E3E7EB',
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
                  border: '1px solid #E3E7EB',
                  borderRadius: '8px'
                }}
                min="1"
                required
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
                  border: '1px solid #E3E7EB',
                  borderRadius: '8px'
                }}
                min="0"
                step="100"
                required
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
                border: '1px solid #E3E7EB',
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
                color: '#008080',
                border: '1px solid #008080',
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
                background: 'linear-gradient(135deg, #3CB371 0%, #008080 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;