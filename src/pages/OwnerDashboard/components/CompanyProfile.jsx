import React from 'react';

const CompanyProfile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Company Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue="TechCorp Solutions"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Industry
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue="Technology"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Size
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option>1-10 employees</option>
              <option>11-50 employees</option>
              <option>51-200 employees</option>
              <option>201-500 employees</option>
              <option>500+ employees</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Founded Year
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue="2020"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Company Description
          </label>
          <textarea
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue="Leading technology solutions provider..."
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue="contact@techcorp.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue="https://techcorp.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <input
              type="url"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue="https://linkedin.com/company/techcorp"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;