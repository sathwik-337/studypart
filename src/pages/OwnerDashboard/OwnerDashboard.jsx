import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './components/DashboardOverview';
import JobManagement from './components/JobManagement';
import EventManagement from './components/EventManagement';
import ApplicationsManagement from './components/ApplicationsManagement';
import Analytics from './components/Analytics';
import CompanyProfile from './components/CompanyProfile';

const OwnerDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="jobs/*" element={<JobManagement />} />
        <Route path="events/*" element={<EventManagement />} />
        <Route path="applications" element={<ApplicationsManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<CompanyProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default OwnerDashboard;