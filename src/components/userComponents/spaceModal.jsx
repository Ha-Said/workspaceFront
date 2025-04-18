import React, { useState } from 'react';
import { createBooking } from '../../ApiCalls/apiCalls';

export function SpaceModal({ isOpen, toggleModal, space }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    status: 'pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !space) return null;

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const booking = {
        ...bookingData,
        space: space._id,
        startTime: new Date(`${bookingData.date}T${bookingData.startTime}`),
        endTime: new Date(`${bookingData.date}T${bookingData.endTime}`),
        status: 'pending'
      };

      await createBooking(booking);
      toggleModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl p-4 mx-auto my-8">
        <div className="relative bg-white rounded-2xl shadow-xl dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {space.name}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              onClick={toggleModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <img
                    src={space.photo && space.photo.length > 0 ? `http://localhost:5000/${space.photo[selectedImage]}` : '/uploads/placeholder.jpg'}
                    alt={space.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {space.photo && space.photo.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {space.photo.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                          selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                        }`}
                      >
                        <img
                          src={`http://localhost:5000/${photo}`}
                          alt={`${space.name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Space Details and Booking Form */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{space.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">{space.type}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{space.capacity} people</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{space.pricePerHour} DT/hour</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">{space.status}</p>
                    </div>
                  </div>

                  {space.amenities && space.amenities.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {space.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900 dark:text-blue-200"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Booking Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Book This Space</h4>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleBookingChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={bookingData.startTime}
                        onChange={handleBookingChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={bookingData.endTime}
                        onChange={handleBookingChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Booking...
                      </span>
                    ) : (
                      'Book Now'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}