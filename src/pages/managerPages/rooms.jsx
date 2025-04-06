import React, { useEffect, useState } from 'react';
import { getAllWorkspaces } from '../../ApiCalls/apiCalls';
import { ModalForm } from '../../components/managerComponents/newSpace';

export default function Spaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getAllWorkspaces()
      .then(data => {
        if (Array.isArray(data)) {
          setWorkspaces(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(error => console.error('Error fetching workspaces:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(workspaces) && workspaces.map(workspace => (
        <div key={workspace._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img 
              className="rounded-t-lg" 
              src={workspace.photos && workspace.photos.length > 0 ? workspace.photos[0] : '/uploads/placeholder.jpg'} 
              alt={workspace.name} 
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workspace.name}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Type: {workspace.type}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Capacity: {workspace.capacity}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Amenities: {workspace.amenities.join(', ')}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: {workspace.location}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price per hour: ${workspace.pricePerHour}</p>
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
          
        </div>
        
      ))}
      <div
        className="max-w-sm h-32 bg-white border border-dotted border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center"
        onClick={toggleModal}
      >
        <a className="w-full h-full flex justify-center items-center text-4xl text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">+</a>
      </div>
      <ModalForm isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
}