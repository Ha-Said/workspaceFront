import React, { useEffect, useState } from 'react';
import { getAllWorkspaces } from '../../ApiCalls/apiCalls';
import { ModalForm } from '../../components/managerComponents/newSpace';
import { UpdateSpaceModal } from '../../components/managerComponents/updateSpace'; // Import the update modal

export default function Spaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State for update modal
  const [selectedWorkspace, setSelectedWorkspace] = useState(null); // State for selected workspace

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleUpdateModal = (workspace) => {
    setSelectedWorkspace(workspace);
    setIsUpdateModalOpen(!isUpdateModalOpen);
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
              className="rounded-t-lg w-full h-48 object-cover" 
              src={workspace.photo && workspace.photo.length > 0 ? `http://localhost:5000/${workspace.photo[0]}` : '/uploads/placeholder.jpg'} 
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
            <button 
              onClick={() => toggleUpdateModal(workspace)} 
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Update Space
            </button>
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
      {isUpdateModalOpen && <UpdateSpaceModal isOpen={isUpdateModalOpen} toggleModal={toggleUpdateModal} workspace={selectedWorkspace} />}
    </div>
  );
}