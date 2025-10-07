import React, { useState, useEffect } from 'react';
import API_BASE_URL, { API_ENDPOINTS } from '../config/api';

const StudentRegistrationManagement = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.studentRequests}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPendingRequests(data.requests || []);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch pending requests');
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      setError('Failed to fetch pending requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.approveStudent}/${requestId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSuccess('Student approved successfully!');
        fetchPendingRequests(); // Refresh the list
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to approve student');
      }
    } catch (error) {
      console.error('Error approving student:', error);
      setError('Failed to approve student');
    }
  };

  const handleReject = async (requestId, reason = '') => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.rejectStudent}/${requestId}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });

      if (response.ok) {
        setSuccess('Student registration rejected');
        fetchPendingRequests(); // Refresh the list
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to reject student');
      }
    } catch (error) {
      console.error('Error rejecting student:', error);
      setError('Failed to reject student');
    }
  };

  const viewPDF = (pdfUrl) => {
    if (pdfUrl) {
      // Open PDF in new tab
      window.open(`${API_BASE_URL}/${pdfUrl}`, '_blank');
    } else {
      alert('No PDF available for this request');
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading pending requests...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student Registration Requests</h2>
      
      {error && (
        <div style={styles.errorMessage}>
          {error}
          <button onClick={() => setError('')} style={styles.closeButton}>×</button>
        </div>
      )}
      
      {success && (
        <div style={styles.successMessage}>
          {success}
          <button onClick={() => setSuccess('')} style={styles.closeButton}>×</button>
        </div>
      )}

      {pendingRequests.length === 0 ? (
        <div style={styles.noRequests}>
          <p>No pending student registration requests</p>
        </div>
      ) : (
        <div style={styles.requestsList}>
          {pendingRequests.map((request) => (
            <div key={request.id} style={styles.requestCard}>
              <div style={styles.requestHeader}>
                <h3>{request.first_name} {request.last_name}</h3>
                <span style={styles.requestDate}>
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div style={styles.requestBody}>
                <div style={styles.requestInfo}>
                  <p><strong>Email:</strong> {request.email}</p>
                  <p><strong>Phone:</strong> {request.phone || 'Not provided'}</p>
                  <p><strong>Date of Birth:</strong> {request.date_of_birth ? new Date(request.date_of_birth).toLocaleDateString() : 'Not provided'}</p>
                  <p><strong>College:</strong> {request.college_name || 'Not provided'}</p>
                  <p><strong>College Address:</strong> {request.college_address || 'Not provided'}</p>
                  <p><strong>Current Address:</strong> {request.current_address || 'Not provided'}</p>
                  <p><strong>Permanent Address:</strong> {request.permanent_address || 'Not provided'}</p>
                </div>
                
                <div style={styles.actionButtons}>
                  {request.college_id_pdf_url && (
                    <button
                      onClick={() => viewPDF(request.college_id_pdf_url)}
                      style={styles.viewPdfButton}
                    >
                      📄 View College ID PDF
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleApprove(request.id)}
                    style={styles.approveButton}
                  >
                    Approve
                  </button>
                  
                  <button
                    onClick={() => handleReject(request.id)}
                    style={styles.rejectButton}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button 
        onClick={fetchPendingRequests}
        style={styles.refreshButton}
      >
        Refresh
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '10px'
  },
  noRequests: {
    textAlign: 'center',
    padding: '40px',
    color: '#666'
  },
  requestsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  requestCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  requestHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  requestDate: {
    color: '#666',
    fontSize: '14px'
  },
  requestBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  requestInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '10px'
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  viewPdfButton: {
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  approveButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  refreshButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px'
  }
};

export default StudentRegistrationManagement;