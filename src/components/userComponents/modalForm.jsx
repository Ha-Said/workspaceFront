import React, { useState, useEffect } from 'react';
import { getAllWorkspaces, createBooking } from '../../ApiCalls/apiCalls';

export function UserModalForm({ isOpen, toggleModal }) {
  const [formData, setFormData] = useState({
    user: '',
    workspace: '',
    date: '',
    startTime: '',
    endTime: '',
    status: 'pending',
  });
  const [workspaces, setWorkspaces] = useState([]);
  const [pricePerHour, setPricePerHour] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const data = await getAllWorkspaces();
        setWorkspaces(data);
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    };

    fetchWorkspaces();

    // Extract user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Adjust this line based on how you store the user information
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        user: user.id, // Adjust this line based on your user object structure
      }));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
  
      if (name === 'workspace') {
        const selectedIndex = e.target.selectedIndex - 1; 
        console.log("Selected Index:", selectedIndex);
  
        const selectedWorkspace = workspaces[selectedIndex]; 
        const newPricePerHour = selectedWorkspace ? selectedWorkspace.pricePerHour : 0;
  
        setPricePerHour(newPricePerHour);
        calculateTotalCost(updatedData.date, updatedData.startTime, updatedData.endTime, newPricePerHour);
      } else if (name === 'startTime' || name === 'endTime') {
        calculateTotalCost(updatedData.date, updatedData.startTime, updatedData.endTime, pricePerHour);
      }
  
      return updatedData;
    });
  };
  

  const calculateTotalCost = (date, startTime, endTime, pricePerHour) => {
    if (date && startTime && endTime && pricePerHour) {
      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);
      const duration = (end - start) / (1000 * 60 * 60);
      setTotalCost(duration * pricePerHour);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        ...formData,
        startTime: new Date(`${formData.date}T${formData.startTime}`),
        endTime: new Date(`${formData.date}T${formData.endTime}`),
      };
      await createBooking(bookingData);
      toggleModal();
    } catch (error) {
      console.error('Error creating booking:', error);
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
                  Create New Booking
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
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="workspace"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Workspace
                    </label>
                    <select
                      name="workspace"
                      id="workspace"
                      value={formData.workspace}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="">Select a workspace</option>
                      {workspaces.map((workspace) => (
                        <option key={workspace._id} value={workspace._id}>
                          {workspace.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formData.workspace && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-900 dark:text-white">
                        This workspace costs: ${pricePerHour.toFixed(2)} per hour
                      </p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <label
                      htmlFor="date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="startTime"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      id="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="endTime"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      id="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="totalCost"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Total Cost
                    </label>
                    <input
                      type="text"
                      name="totalCost"
                      id="totalCost"
                      value={`$${totalCost.toFixed(2)}`}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}