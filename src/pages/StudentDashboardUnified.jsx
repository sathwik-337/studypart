import React, { useState, useEffect } from 'react';

// Inline styles for the Student Dashboard
const styles = `
/* Student Dashboard Styles - Modern Redesign */
.student-dashboard {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #FFFFFF 0%, #F4F6FB 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Inter', sans-serif;
  color: #1B263B;
}

/* Sidebar Styles - Teal Gradient */
.sidebar {
  width: 300px;
  background: linear-gradient(135deg, #3CB371 0%, #008080 100%);
  color: white;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 0 24px 24px 0;
  position: relative;
  z-index: 10;
}

.profile-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.profile-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 4px solid rgba(255, 255, 255, 0.4);
  background: linear-gradient(135deg, #FFFFFF 0%, #F4F6FB 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.profile-section h3 {
  margin: 0.5rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-section p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-item {
  background: none;
  border: none;
  color: white;
  padding: 1.25rem 1.5rem;
  text-align: left;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.25);
  font-weight: 600;
  transform: translateX(8px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  font-size: 1.2rem;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Main Content Styles */
.main-content {
  flex: 1;
  padding: 3rem 2.5rem;
  overflow-y: auto;
  background: transparent;
  margin-left: -24px;
  border-radius: 24px 0 0 24px;
  position: relative;
}

.main-content h1 {
  color: #1B263B;
  margin-bottom: 3rem;
  font-size: 2.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1B263B 0%, #3CB371 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Dashboard Tab Styles */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-card {
  background: #FFFFFF;
  padding: 2.5rem 2rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(27, 38, 59, 0.08);
  text-align: center;
  border: 1px solid rgba(244, 246, 251, 0.8);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #1A73E8 0%, #1558B0 100%);
}

.stat-card.accepted::before {
  background: linear-gradient(135deg, #27AE60 0%, #50C878 100%);
}

.stat-card.pending::before {
  background: linear-gradient(135deg, #3CB371 0%, #008080 100%);
}

.stat-card.rejected::before {
  background: linear-gradient(135deg, #1A73E8 0%, #1558B0 100%);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(27, 38, 59, 0.12);
}

.stat-card h3 {
  margin: 0 0 1.5rem 0;
  color: #1B263B;
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.8;
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1B263B;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.quick-actions {
  background: #FFFFFF;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(27, 38, 59, 0.08);
  margin-bottom: 3rem;
  border: 1px solid rgba(244, 246, 251, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.quick-actions:hover {
  box-shadow: 0 12px 40px rgba(27, 38, 59, 0.12);
}

.quick-actions h2 {
  margin: 0 0 2rem 0;
  color: #1B263B;
  font-size: 1.5rem;
  font-weight: 700;
}

.action-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.action-btn {
  background: linear-gradient(135deg, #1A73E8 0%, #1558B0 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(26, 115, 232, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(26, 115, 232, 0.4);
}

.recent-activity {
  background: #FFFFFF;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(27, 38, 59, 0.08);
  border: 1px solid rgba(244, 246, 251, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.recent-activity:hover {
  box-shadow: 0 12px 40px rgba(27, 38, 59, 0.12);
}

.recent-activity h2 {
  margin: 0 0 2rem 0;
  color: #1B263B;
  font-size: 1.5rem;
  font-weight: 700;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #F4F6FB 0%, #F2F6F8 100%);
  border-radius: 16px;
  border: 1px solid rgba(244, 246, 251, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.activity-item:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 16px rgba(27, 38, 59, 0.08);
}

.activity-item span:first-child {
  font-size: 1.5rem;
}

.activity-item div {
  flex: 1;
}

.activity-item p {
  margin: 0;
}

.activity-item p:first-child {
  font-weight: 600;
}

.activity-item p:last-child {
  font-size: 0.9rem;
  color: #666;
}

/* Filters */
.filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  padding: 2rem;
  background: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(27, 38, 59, 0.06);
  border: 1px solid rgba(244, 246, 251, 0.8);
}

.search-input,
.filter-select {
  padding: 1rem 1.25rem;
  border: 2px solid rgba(244, 246, 251, 0.8);
  border-radius: 16px;
  font-size: 1rem;
  background: #FFFFFF;
  color: #1B263B;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #3CB371;
  box-shadow: 0 0 0 4px rgba(60, 179, 113, 0.1);
}

.search-input {
  flex: 1;
  min-width: 300px;
}

.filter-select {
  min-width: 180px;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
}

.job-card {
  background: #FFFFFF;
  padding: 2.5rem 2rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(27, 38, 59, 0.08);
  border: 1px solid rgba(244, 246, 251, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.job-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #3CB371 0%, #008080 100%);
}

.job-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 48px rgba(27, 38, 59, 0.15);
}

.job-card h3 {
  margin: 0 0 0.75rem 0;
  color: #1B263B;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
}

.job-card .company {
  margin: 0 0 1.5rem 0;
  color: #3CB371;
  font-weight: 600;
  font-size: 1.1rem;
}

.job-card .location,
.job-card .type {
  margin: 0.5rem 0;
  color: #1B263B;
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.7;
}

.job-card .description {
  margin: 1.5rem 0;
  color: #1B263B;
  line-height: 1.6;
  opacity: 0.8;
  font-size: 1rem;
}

.requirements {
  margin: 1.5rem 0;
}

.requirements strong {
  color: #1B263B;
  font-size: 0.95rem;
  font-weight: 600;
}

.requirement-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.requirement-tag {
  background: linear-gradient(135deg, #F4F6FB 0%, #F2F6F8 100%);
  color: #1B263B;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(244, 246, 251, 0.8);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.requirement-tag:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #3CB371 0%, #008080 100%);
  color: white;
}

.apply-btn {
  background: linear-gradient(135deg, #1A73E8 0%, #1558B0 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(26, 115, 232, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.apply-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(26, 115, 232, 0.4);
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
}

.event-card {
  background: #FFFFFF;
  padding: 2.5rem 2rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(27, 38, 59, 0.08);
  border: 1px solid rgba(244, 246, 251, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.event-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #27AE60 0%, #50C878 100%);
}

.event-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 48px rgba(27, 38, 59, 0.15);
}

.event-card h3 {
  margin: 0 0 1rem 0;
  color: #1B263B;
  font-size: 1.25rem;
}

.event-card .date,
.event-card .time,
.event-card .location {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.event-card .description {
  margin: 1rem 0;
  color: #555;
  line-height: 1.5;
}

.register-btn {
  background: linear-gradient(135deg, #27AE60 0%, #50C878 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(39, 174, 96, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.register-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(39, 174, 96, 0.4);
}

/* Applications List */
.applications-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.application-card {
  background: #FFFFFF;
  padding: 2rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(27, 38, 59, 0.08);
  border: 1px solid rgba(244, 246, 251, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.application-card:hover {
  transform: translateX(8px);
  box-shadow: 0 12px 40px rgba(27, 38, 59, 0.12);
}

.app-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.app-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F4F6FB 0%, #F2F6F8 100%);
  border-radius: 16px;
  border: 1px solid rgba(244, 246, 251, 0.8);
}

.app-details h3 {
  margin: 0 0 0.5rem 0;
  color: #1B263B;
  font-size: 1.25rem;
  font-weight: 700;
}

.app-details p {
  margin: 0.25rem 0;
  color: #1B263B;
  font-size: 0.95rem;
  opacity: 0.7;
  font-weight: 500;
}

/* Status Badges */
.status-badge {
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.status-badge.pending {
  background: linear-gradient(135deg, #3CB371 0%, #008080 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(60, 179, 113, 0.3);
}

.status-badge.accepted {
  background: linear-gradient(135deg, #27AE60 0%, #50C878 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.status-badge.rejected {
  background: linear-gradient(135deg, #1A73E8 0%, #1558B0 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
}

.status-badge:hover {
  transform: translateY(-2px);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(27, 38, 59, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: #FFFFFF;
  border-radius: 24px;
  max-width: 640px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(27, 38, 59, 0.25);
  border: 1px solid rgba(244, 246, 251, 0.8);
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 2rem;
}

.cover-letter-section {
  margin: 1.5rem 0;
}

.cover-letter-section label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.cover-letter-section textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.cancel-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.submit-btn {
  background: linear-gradient(135deg, #1A73E8 0%, #1558B0 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 160px;
  box-shadow: 0 4px 16px rgba(26, 115, 232, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 115, 232, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Loading State */
.loading {
  text-align: center;
  padding: 4rem;
  color: #1B263B;
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.8;
}

/* No Applications State */
.no-applications {
  text-align: center;
  padding: 4rem;
  color: #1B263B;
  background: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(27, 38, 59, 0.08);
  border: 1px solid rgba(244, 246, 251, 0.8);
}

.no-applications p {
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.8;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 260px;
  }
  
  .main-content {
    padding: 2rem 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
  
  .jobs-grid,
  .events-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .student-dashboard {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    padding: 1.5rem;
    border-radius: 0 0 24px 24px;
  }
  
  .profile-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    text-align: left;
    padding: 1.5rem;
  }
  
  .profile-avatar {
    width: 60px;
    height: 60px;
  }
  
  .nav-menu {
    flex-direction: row;
    overflow-x: auto;
    gap: 1rem;
    padding: 0 0.5rem;
  }
  
  .nav-item {
    white-space: nowrap;
    min-width: fit-content;
    padding: 1rem 1.25rem;
  }
  
  .main-content {
    padding: 1.5rem;
    margin-left: 0;
    border-radius: 0;
  }
  
  .main-content h1 {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .jobs-grid,
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-input,
  .filter-select {
    width: 100%;
    min-width: auto;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .application-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  .app-info {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .sidebar {
    padding: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .main-content h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card,
  .job-card,
  .event-card {
    padding: 1.5rem;
  }
  
  .quick-actions,
  .recent-activity {
    padding: 2rem 1.5rem;
  }
}
`;

// Custom hooks
const useLocalStorage = (key, initialValue) => {
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

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
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

const StudentDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useLocalStorage('studentDashboardTab', 'dashboard');
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState({
    jobs: false,
    events: false,
    applications: false
  });
  const [filters, setFilters] = useState({
    jobSearch: '',
    jobLocation: '',
    jobType: '',
    eventSearch: '',
    eventLocation: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  // Mock student data
  const studentData = {
    name: "John Doe",
    email: "john.doe@student.edu",
    avatar: "/api/placeholder/50/50",
    id: "STU001"
  };

  // Mock API data
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

  const mockApplications = [
    {
      id: 1,
      type: "job",
      title: "Software Engineer Intern",
      company: "Tech Corp",
      appliedDate: "2025-10-01",
      status: "pending"
    },
    {
      id: 2,
      type: "event",
      title: "Tech Career Fair 2025",
      company: "University",
      appliedDate: "2025-09-28",
      status: "accepted"
    },
    {
      id: 3,
      type: "job",
      title: "Data Analyst",
      company: "Data Solutions Inc",
      appliedDate: "2025-09-25",
      status: "rejected"
    }
  ];

  // Effect to load mock data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(prev => ({ ...prev, jobs: true, events: true, applications: true }));
      
      // Simulate API delay
      setTimeout(() => {
        setJobs(mockJobs);
        setEvents(mockEvents);
        setApplications(mockApplications);
        setLoading({ jobs: false, events: false, applications: false });
      }, 1000);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter functions
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(filters.jobSearch.toLowerCase()) &&
    (filters.jobLocation === '' || job.location.includes(filters.jobLocation)) &&
    (filters.jobType === '' || job.type === filters.jobType)
  );

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(filters.eventSearch.toLowerCase()) &&
    (filters.eventLocation === '' || event.location.includes(filters.eventLocation))
  );

  // Statistics calculations
  const stats = {
    totalApplications: applications.length,
    acceptedApplications: applications.filter(app => app.status === 'accepted').length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    rejectedApplications: applications.filter(app => app.status === 'rejected').length
  };

  // Handler functions
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleApplyJob = (job) => {
    setSelectedItem(job);
    setModalType('job');
    setShowModal(true);
  };

  const handleRegisterEvent = (event) => {
    setSelectedItem(event);
    setModalType('event');
    setShowModal(true);
  };

  const handleSubmitApplication = async () => {
    const newApplication = {
      id: applications.length + 1,
      type: modalType,
      title: selectedItem.title || selectedItem.name,
      company: selectedItem.company || 'University',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setApplications(prev => [...prev, newApplication]);
    setShowModal(false);
    setCoverLetter('');
    setSelectedItem(null);
    
    // Show success message
    alert(`Successfully ${modalType === 'job' ? 'applied for' : 'registered for'} ${newApplication.title}!`);
  };

  const handleLogout = () => {
    alert('Logout functionality to be implemented');
  };

  // Inject styles into the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: '250px',
        background: '#4CAF50',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '2rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '700',
            margin: '0'
          }}>{studentData.name}</h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.875rem',
            margin: '0.5rem 0 0'
          }}>Student Dashboard</p>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          <button 
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem 1.5rem',
              background: activeTab === 'dashboard' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: 'white',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === 'dashboard' ? '4px solid white' : '4px solid transparent'
            }}
            onClick={() => handleTabChange('dashboard')}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.background = activeTab === 'dashboard' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
          >
            Dashboard Overview
          </button>
          <button 
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem 1.5rem',
              background: activeTab === 'jobs' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: 'white',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === 'jobs' ? '4px solid white' : '4px solid transparent'
            }}
            onClick={() => handleTabChange('jobs')}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.background = activeTab === 'jobs' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
          >
            Job Management
          </button>
          <button 
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem 1.5rem',
              background: activeTab === 'events' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: 'white',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === 'events' ? '4px solid white' : '4px solid transparent'
            }}
            onClick={() => handleTabChange('events')}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.background = activeTab === 'events' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
          >
            Event Management
          </button>
          <button 
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem 1.5rem',
              background: activeTab === 'applications' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: 'white',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === 'applications' ? '4px solid white' : '4px solid transparent'
            }}
            onClick={() => handleTabChange('applications')}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.background = activeTab === 'applications' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
          >
            Applications
          </button>
          <button 
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem 1.5rem',
              background: activeTab === 'analytics' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: 'white',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === 'analytics' ? '4px solid white' : '4px solid transparent'
            }}
            onClick={() => handleTabChange('analytics')}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.background = activeTab === 'analytics' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '2rem',
        background: '#f8f9fa',
        overflow: 'auto'
      }}>
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#333',
              marginBottom: '2rem'
            }}>Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderTop: '4px solid #4CAF50'
              }}>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#666',
                  margin: '0 0 0.5rem'
                }}>Active Job Postings</h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#4CAF50'
                }}>{mockJobs.length}</div>
              </div>
              
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderTop: '4px solid #2196F3'
              }}>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#666',
                  margin: '0 0 0.5rem'
                }}>Total Applications</h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#2196F3'
                }}>{stats.totalApplications}</div>
              </div>
              
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderTop: '4px solid #4CAF50'
              }}>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#666',
                  margin: '0 0 0.5rem'
                }}>Upcoming Events</h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#4CAF50'
                }}>{mockEvents.length}</div>
              </div>
              
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderTop: '4px solid #FF9800'
              }}>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#666',
                  margin: '0 0 0.5rem'
                }}>Success Rate</h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#FF9800'
                }}>{stats.totalApplications > 0 ? Math.round((stats.acceptedApplications / stats.totalApplications) * 100) : 0}%</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '1rem'
              }}>Quick Actions</h2>
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <button 
                  onClick={() => handleTabChange('jobs')}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#45a049'}
                  onMouseLeave={(e) => e.target.style.background = '#4CAF50'}
                >
                  Browse New Jobs
                </button>
                <button 
                  onClick={() => handleTabChange('events')}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#45a049'}
                  onMouseLeave={(e) => e.target.style.background = '#4CAF50'}
                >
                  Schedule Event
                </button>
                <button 
                  onClick={() => handleTabChange('applications')}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#45a049'}
                  onMouseLeave={(e) => e.target.style.background = '#4CAF50'}
                >
                  Review Applications
                </button>
                <button 
                  onClick={() => handleTabChange('analytics')}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#45a049'}
                  onMouseLeave={(e) => e.target.style.background = '#4CAF50'}
                >
                  View Analytics
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '1rem'
              }}>Recent Activity</h2>
              <div style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                {applications.slice(0, 3).map((app, index) => (
                  <div key={app.id} style={{
                    padding: '1rem 1.5rem',
                    borderBottom: index < 2 ? '1px solid #eee' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p style={{ margin: '0 0 0.25rem', fontWeight: '500', color: '#333' }}>
                        New application received for {app.jobTitle} position
                      </p>
                      <p style={{ margin: '0', fontSize: '0.875rem', color: '#666' }}>
                        Applied on {new Date(app.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: '#2196F3',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Browse Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#333',
              marginBottom: '2rem'
            }}>Job Management</h1>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <input
                type="text"
                placeholder="Search jobs..."
                value={filters.jobSearch}
                onChange={(e) => setFilters(prev => ({ ...prev, jobSearch: e.target.value }))}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  flex: '1',
                  minWidth: '200px'
                }}
              />
              <select
                value={filters.jobLocation}
                onChange={(e) => setFilters(prev => ({ ...prev, jobLocation: e.target.value }))}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  background: 'white',
                  minWidth: '150px'
                }}
              >
                <option value="">All Locations</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Remote">Remote</option>
              </select>
              <select
                value={filters.jobType}
                onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {loading.jobs ? (
              <div className="loading">Loading jobs...</div>
            ) : (
              <div className="jobs-grid">
                {filteredJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                    <p className="location">📍 {job.location}</p>
                    <p className="type">🏷️ {job.type}</p>
                    <p className="description">{job.description}</p>
                    <div className="requirements">
                      <strong>Requirements:</strong>
                      <div className="requirement-tags">
                        {job.requirements.map(req => (
                          <span key={req} className="requirement-tag">{req}</span>
                        ))}
                      </div>
                    </div>
                    <button 
                      className="apply-btn"
                      onClick={() => handleApplyJob(job)}
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Browse Events Tab */}
        {activeTab === 'events' && (
          <div className="events-tab">
            <h1>Browse Events</h1>
            
            <div className="filters">
              <input
                type="text"
                placeholder="Search events..."
                value={filters.eventSearch}
                onChange={(e) => setFilters(prev => ({ ...prev, eventSearch: e.target.value }))}
                className="search-input"
              />
              <select
                value={filters.eventLocation}
                onChange={(e) => setFilters(prev => ({ ...prev, eventLocation: e.target.value }))}
                className="filter-select"
              >
                <option value="">All Locations</option>
                <option value="University">University</option>
                <option value="Convention Center">Convention Center</option>
                <option value="Business Building">Business Building</option>
              </select>
            </div>

            {loading.events ? (
              <div className="loading">Loading events...</div>
            ) : (
              <div className="events-grid">
                {filteredEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <h3>{event.name}</h3>
                    <p className="date">📅 {event.date}</p>
                    <p className="time">🕐 {event.time}</p>
                    <p className="location">📍 {event.location}</p>
                    <p className="description">{event.description}</p>
                    <button 
                      className="register-btn"
                      onClick={() => handleRegisterEvent(event)}
                    >
                      Register Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'applications' && (
          <div className="applications-tab">
            <h1>My Applications</h1>
            
            {loading.applications ? (
              <div className="loading">Loading applications...</div>
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app.id} className="application-card">
                    <div className="app-info">
                      <span className="app-icon">
                        {app.type === 'job' ? '💼' : '📅'}
                      </span>
                      <div className="app-details">
                        <h3>{app.title}</h3>
                        <p>{app.company}</p>
                        <p>Applied: {app.appliedDate}</p>
                      </div>
                    </div>
                    <span className={`status-badge ${app.status}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                ))}
                
                {applications.length === 0 && (
                  <div className="no-applications">
                    <p>No applications yet. Start browsing jobs and events!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Applications */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'job' ? 'Apply for Job' : 'Register for Event'}
      >
        <div className="modal-content">
          <h3>{selectedItem?.title || selectedItem?.name}</h3>
          <p>{selectedItem?.company || 'University Event'}</p>
          
          {modalType === 'job' && (
            <div className="cover-letter-section">
              <label htmlFor="coverLetter">Cover Letter:</label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a brief cover letter explaining why you're interested in this position..."
                rows={6}
              />
            </div>
          )}
          
          <div className="modal-actions">
            <button onClick={() => setShowModal(false)} className="cancel-btn">
              Cancel
            </button>
            <button onClick={handleSubmitApplication} className="submit-btn">
              {modalType === 'job' ? 'Submit Application' : 'Register'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentDashboard;