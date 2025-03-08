import React from "react";
import { useParams } from "react-router-dom";

export default function AccountForm() {
  // Retrieve the email from the URL parameters
  const { email } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-md shadow-md">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6">Account</h2>

      {/* Profile Picture and Buttons */}
      <div className="flex items-center mb-8">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src="https://via.placeholder.com/64" // Replace with user profile photo
          alt="User profile"
        />
        <div className="ml-4">
          <button className="px-4 py-2 mr-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
            Upload
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username*
            </label>
            <input
              type="text"
              id="username"
              placeholder="Ex. BonnieG"
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email*
            </label>
            <input
              type="email"
              id="email"
              defaultValue={email} // Pre-populate with the email from URL
              placeholder="name@example.com"
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Ex. 123-456-7890"
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Account Type */}
          <div>
            <label htmlFor="accountType" className="block mb-1 font-medium">
              Account Type*
            </label>
            <select
              id="accountType"
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option>Choose your account type</option>
              <option>Manager</option>
              <option>Member</option>
            </select>
          </div>
        </div>

        {/* Save and Remove Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 font-medium"
          >
            Save
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Remove
          </button>
        </div>
      </form>
    </div>
  );
}
