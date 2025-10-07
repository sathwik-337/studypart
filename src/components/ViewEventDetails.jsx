import React from 'react';
import { useParams } from 'react-router-dom';

const ViewEventDetails = ({ events, onBack }) => {
  const { eventId } = useParams();
  const event = events.find(e => e.id === parseInt(eventId));

  if (!event) {
    return (
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1B263B' }}>Event not found</h2>
        <button
          onClick={onBack}
          style={{
            marginTop: '16px',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #3CB371 0%, #008080 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1B263B' }}>Event Details</h2>
        <button
          onClick={onBack}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #3CB371 0%, #008080 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Back to Events
        </button>
      </div>

      <div style={{
        background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 100%)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '600', 
          color: '#1B263B',
          marginBottom: '16px' 
        }}>
          {event.title}
        </h3>

        <div style={{ display: 'grid', gap: '24px' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#4A5A6A', marginBottom: '8px' }}>
              Event Details
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <p style={{ color: '#4A5A6A', fontSize: '0.875rem' }}>Date & Time</p>
                <p style={{ color: '#1B263B', fontWeight: '500' }}>{event.date} at {event.time}</p>
              </div>
              <div>
                <p style={{ color: '#4A5A6A', fontSize: '0.875rem' }}>Location</p>
                <p style={{ color: '#1B263B', fontWeight: '500' }}>{event.location}</p>
              </div>
              <div>
                <p style={{ color: '#4A5A6A', fontSize: '0.875rem' }}>Event Type</p>
                <p style={{ color: '#1B263B', fontWeight: '500' }}>{event.type}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#4A5A6A', marginBottom: '8px' }}>
              Description
            </h4>
            <p style={{ color: '#1B263B', lineHeight: '1.5' }}>{event.description}</p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#4A5A6A', marginBottom: '8px' }}>
              Registration Information
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <p style={{ color: '#4A5A6A', fontSize: '0.875rem' }}>Maximum Participants</p>
                <p style={{ color: '#1B263B', fontWeight: '500' }}>{event.maxParticipants}</p>
              </div>
              <div>
                <p style={{ color: '#4A5A6A', fontSize: '0.875rem' }}>Registration Deadline</p>
                <p style={{ color: '#1B263B', fontWeight: '500' }}>{event.registrationDeadline}</p>
              </div>
              <div>
                <p style={{ color: '#4A5A6A', fontSize: '0.875rem' }}>Remuneration</p>
                <p style={{ color: '#1B263B', fontWeight: '500' }}>
                  {event.remuneration > 0 
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(event.remuneration)
                    : 'No remuneration'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEventDetails;