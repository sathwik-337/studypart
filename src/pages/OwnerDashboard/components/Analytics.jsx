import React from 'react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Analytics Header with Date Range Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics Overview</h2>
        <select className="border rounded-lg px-3 py-2">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Applications</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">245</p>
            <p className="ml-2 text-sm text-green-600">+12.5%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">15.4%</p>
            <p className="ml-2 text-sm text-red-600">-2.3%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Average Time to Hire</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold">18d</p>
            <p className="ml-2 text-sm text-green-600">-3d</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Applications by Job Position</h3>
          <div className="h-64">
            {/* Chart component would go here */}
            <p className="text-gray-500 text-center mt-20">Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Application Sources</h3>
          <div className="h-64">
            {/* Chart component would go here */}
            <p className="text-gray-500 text-center mt-20">Chart Placeholder</p>
          </div>
        </div>
      </div>

      {/* Application Status Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Application Status Breakdown</h3>
        <div className="grid grid-cols-4 gap-4">
          <StatusCard status="New" count={45} color="blue" />
          <StatusCard status="In Review" count={28} color="yellow" />
          <StatusCard status="Shortlisted" count={15} color="green" />
          <StatusCard status="Rejected" count={32} color="red" />
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ status, count, color }) => (
  <div className={`p-4 rounded-lg bg-${color}-50`}>
    <h4 className={`text-${color}-700 font-medium`}>{status}</h4>
    <p className="text-2xl font-semibold mt-2">{count}</p>
  </div>
);

export default Analytics;