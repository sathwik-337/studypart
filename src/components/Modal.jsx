// Modal Components for Student Dashboard
import React, { useState } from 'react';
import './Modal.css';

// Generic Modal Component
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Job Application Modal
export const JobApplicationModal = ({ isOpen, onClose, job, onSubmit }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverLetter.trim()) {
      alert('Please write a cover letter');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        jobId: job.id,
        coverLetter,
        resume
      });
      setCoverLetter('');
      setResume(null);
      onClose();
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  if (!isOpen || !job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apply for Job">
      <div className="job-application-modal">
        <div className="job-info">
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>
          <p className="location">📍 {job.location}</p>
          <p className="salary">💰 {job.salary}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter *</label>
            <textarea
              id="coverLetter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write a compelling cover letter explaining why you're the perfect fit for this position..."
              rows={8}
              required
            />
            <small>{coverLetter.length}/1000 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="resume">Resume (PDF)</label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleFileChange}
            />
            {resume && (
              <p className="file-selected">✓ {resume.name}</p>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="submit-btn">
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// Event Registration Modal
export const EventRegistrationModal = ({ isOpen, onClose, event, onSubmit }) => {
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);
    try {
      await onSubmit({
        eventId: event.id,
        additionalInfo,
        dietaryRestrictions
      });
      setAdditionalInfo('');
      setDietaryRestrictions('');
      onClose();
    } catch (error) {
      alert('Failed to register for event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !event) return null;

  const spotsLeft = event.capacity - event.registered;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register for Event">
      <div className="event-registration-modal">
        <div className="event-info">
          <h3>{event.name}</h3>
          <p className="date">📅 {event.date}</p>
          <p className="time">🕐 {event.time}</p>
          <p className="location">📍 {event.location}</p>
          <p className="organizer">👥 Organized by {event.organizer}</p>
          <div className="capacity-info">
            <span className={`spots-left ${spotsLeft < 10 ? 'low' : ''}`}>
              {spotsLeft} spots remaining
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information (Optional)</label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Any questions or additional information you'd like to share..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional)</label>
            <input
              type="text"
              id="dietaryRestrictions"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              placeholder="e.g., Vegetarian, Gluten-free, None"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitting || spotsLeft === 0} 
              className="submit-btn"
            >
              {submitting ? 'Registering...' : spotsLeft === 0 ? 'Event Full' : 'Register Now'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// Confirmation Modal
export const ConfirmationModal = ({ isOpen, onClose, title, message, onConfirm, type = 'info' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={`confirmation-modal ${type}`}>
        <p>{message}</p>
        <div className="form-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className={`confirm-btn ${type}`}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};