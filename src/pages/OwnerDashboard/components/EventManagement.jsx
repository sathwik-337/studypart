import React from 'react';

const EventManagement = () => {
  return (
    <div className="space-y-6">
      {/* Event Management Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Event Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create New Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Event Card - would be mapped from actual data */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Tech Talk: Future of AI</h3>
              <p className="text-gray-600 mt-1">Virtual Event</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Upcoming
            </span>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">{/* Calendar Icon */}</span>
              <span>October 15, 2025 - 2:00 PM</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">{/* Users Icon */}</span>
              <span>45 Registered / 100 Capacity</span>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
              Edit
            </button>
            <button className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-100">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;