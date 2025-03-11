import React, { useState, useEffect } from 'react';
import { createBooking } from '../../ApiCalls/apiCalls';

export function SpaceModal({ isOpen, toggleModal, space }) {
  const [formData, setFormData] = useState({
    user: '',
    date: '',
    startTime: '',
    endTime: '',
    status: 'pending',
  });
  const [pricePerHour, setPricePerHour] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        user: user.id,
      }));
    }

    if (space) {
      setPricePerHour(space.pricePerHour);
    }
  }, [space]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === 'startTime' || name === 'endTime') {
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
        space: space._id,
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
          <div className="relative p-4 w-full max-w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Space Details
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
              <div className="p-4 md:p-5">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full px-4 flex justify-center">
                        <div className="relative">
                          <img
                            alt={space.name}
                            src={space.photo}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 text-center mt-20">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-white">
                              {space.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-12">
                      <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-900 dark:text-white ">
                        {space.name}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-900 dark:text-white font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
                        {space.location}
                      </div>
                      <div className="mb-2 text-gray-900 dark:text-white mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-gray-400"></i>
                        {space.description}
                      </div>
                      <div className="mb-2 text-gray-900 dark:text-white">
                        <i className="fas fa-dollar-sign mr-2 text-lg text-gray-400"></i>
                        ${pricePerHour.toFixed(2)} per hour
                      </div>
                    </div>
                    <div className="text-center mt-12">
                      <button
                        type="button"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={toggleModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}