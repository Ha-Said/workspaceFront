import React, { useState, useEffect } from 'react';
import { createWorkspace } from '../../ApiCalls/apiCalls';

export function ModalForm({ isOpen, toggleModal }) {
  const [user, setUser] = useState(null); // Add user state
  const [formData, setFormData] = useState({
    name: '',
    type: 'desk', // Default value from enum
    capacity: '',
    amenities: [], // Changed to an array
    location: '',
    pricePerHour: '',
    photos: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amenities' ? value.split(',').map(item => item.trim()) : value, // Handle amenities as an array
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: Array.from(e.target.files),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workspaceData = new FormData();

    console.log('Name:', formData.name);
    workspaceData.append('name', formData.name);

    console.log('Type:', formData.type);
    workspaceData.append('type', formData.type);

    console.log('Capacity:', formData.capacity);
    workspaceData.append('capacity', formData.capacity);

    console.log('Amenities:', formData.amenities);
    workspaceData.append('amenities', JSON.stringify(formData.amenities)); // Pass amenities as JSON

    console.log('Location:', formData.location);
    workspaceData.append('location', formData.location);

    console.log('Price Per Hour:', formData.pricePerHour);
    workspaceData.append('pricePerHour', formData.pricePerHour);

    console.log('Photos:', formData.photos);
    formData.photos.forEach(file => workspaceData.append('photos', file)); // Append photos correctly

    if (user) {
      console.log('User ID:', user.id);
      workspaceData.append('userId', user.id); 
    }

    try {
      await createWorkspace(workspaceData);
      console.log('Workspace created successfully');
      toggleModal();
    } catch (error) {
      console.error('Error creating workspace:', error.response?.data || error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Workspace
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Workspace Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter workspace name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="desk">Desk</option>
                      <option value="meetingRoom">Meeting Room</option>
                      <option value="privateOffice">Private Office</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="capacity"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      id="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter capacity"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="amenities"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amenities
                    </label>
                    <input
                      type="text"
                      name="amenities"
                      id="amenities"
                      value={formData.amenities.join(', ')} // Display amenities as a comma-separated string
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter amenities (comma-separated)"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pricePerHour"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price Per Hour
                    </label>
                    <input
                      type="number"
                      name="pricePerHour"
                      id="pricePerHour"
                      value={formData.pricePerHour}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter price per hour"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="photos"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Upload Photos
                    </label>
                    <input
                      type="file"
                      name="photos"
                      id="photos"
                      multiple
                      onChange={handleFileChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Workspace
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}