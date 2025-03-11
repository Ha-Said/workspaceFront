import React, { useEffect, useState } from "react";
import { getAllWorkspaces } from "../../ApiCalls/apiCalls";
import { RoomForm } from "../../components/userComponents/modalRoomForm";

import { SpaceModal } from "../../components/userComponents/spaceModal";
export default function UserSpaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (workspace) => {
    if (workspace) {
      setSelectedWorkspace(workspace);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      setSelectedWorkspace(null);
    }
  };

  const toggleModal2 = (workspace) => {
    if (workspace) {
      setSelectedWorkspace(workspace);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      setSelectedWorkspace(null);
    }
  };
  useEffect(() => {
    getAllWorkspaces()
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkspaces(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching workspaces:", error));
  }, []);

  console.log(workspaces);

  return (
    <div>
      <div className="flex flex-wrap gap-6">
        {Array.isArray(workspaces) &&
          workspaces.map((workspace) => (
            <div
              key={workspace._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={workspace.photo}
                  alt={workspace.name}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {workspace.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Type: {workspace.type}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Capacity: {workspace.capacity}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Amenities: {workspace.amenities.join(", ")}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Location: {workspace.location}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Price per hour: {workspace.pricePerHour} DT
                </p>
                <button
                onClick={() => toggleModal2(workspace)}
                  
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => toggleModal(workspace)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-2"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
      </div>
      {selectedWorkspace && (
        <RoomForm
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          space={selectedWorkspace}
        />)}
        {selectedWorkspace && (
          <SpaceModal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            space={selectedWorkspace}
          />)}
      
    </div>
  );
}