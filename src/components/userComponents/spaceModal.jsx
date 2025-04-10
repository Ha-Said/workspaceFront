import React from 'react';

export function SpaceModal({ isOpen, toggleModal, space }) {
  if (!isOpen || !space) return null;

  // Handle multiple photos or default to the first one
  const displayPhoto = space.photo && Array.isArray(space.photo) ? space.photo[0] : space.photo;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl p-4 mx-auto my-8">
        <div className="relative bg-white rounded-lg shadow-xl dark:bg-gray-800">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Workspace Details
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              {/* Left column - Photo gallery */}
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-4">
                <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md mb-4">
                  {displayPhoto ? (
                    <img
                      src={displayPhoto}
                      alt={space.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                
                {/* Thumbnail gallery for multiple photos */}
                {space.photo && Array.isArray(space.photo) && space.photo.length > 1 && (
                  <div className="flex overflow-x-auto space-x-2 pb-2">
                    {space.photo.map((photo, index) => (
                      <div key={index} className="flex-shrink-0 w-20 h-20">
                        <img
                          src={photo}
                          alt={`${space.name} - ${index + 1}`}
                          className="w-full h-full object-cover rounded-md cursor-pointer hover:opacity-90"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right column - Workspace details */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{space.name}</h2>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{space.location}</span>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">{space.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{space.capacity} {space.capacity === 1 ? 'person' : 'people'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{space.pricePerHour} DT per hour</p>
                    </div>
                  </div>
                </div>
                
                {/* Amenities */}
                {space.amenities && space.amenities.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Amenities</h3>
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
                
                {/* Description if available */}
                {space.description && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300">{space.description}</p>
                  </div>
                )}
                
                {/* Availability section */}
                {space.availability && space.availability.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upcoming Bookings</h3>
                    <div className="max-h-40 overflow-y-auto">
                      {space.availability.map((booking, index) => {
                        // Skip available slots
                        if (booking.status === 'available') return null;
                        
                        const startTime = new Date(booking.startTime);
                        const endTime = new Date(booking.endTime);
                        
                        return (
                          <div key={index} className="mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md text-sm">
                            <div className="font-medium">
                              {startTime.toLocaleDateString()} 
                            </div>
                            <div>
                              {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        );
                      }).filter(Boolean)}
                      
                      {space.availability.filter(booking => booking.status !== 'available').length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400">No upcoming bookings</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with actions */}
          <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mr-2"
              onClick={toggleModal}
            >
              Close
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}