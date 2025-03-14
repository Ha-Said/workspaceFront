import React, { useEffect, useState } from "react";
import { getAllWorkspaces } from "../../ApiCalls/apiCalls";
import { RoomForm } from "../../components/userComponents/modalRoomForm";
import { SpaceModal } from "../../components/userComponents/spaceModal";

export default function UserSpaces() {
  // State declarations
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Function to close the modal
  const closeModal = () => {
    setModalType(null);
    setSelectedWorkspace(null);
  };

  // Image carousel navigation functions
  const handleNextImage = (workspaceId) => {
    setCurrentImageIndex((prevState) => {
      const ws = workspaces.find((ws) => ws._id === workspaceId);
      if (!ws || !ws.photo || ws.photo.length === 0) return prevState;
      const newIndex = (prevState[workspaceId] + 1) % ws.photo.length;
      return { ...prevState, [workspaceId]: newIndex };
    });
  };

  const handlePrevImage = (workspaceId) => {
    setCurrentImageIndex((prevState) => {
      const ws = workspaces.find((ws) => ws._id === workspaceId);
      if (!ws || !ws.photo || ws.photo.length === 0) return prevState;
      const newIndex = (prevState[workspaceId] - 1 + ws.photo.length) % ws.photo.length;
      return { ...prevState, [workspaceId]: newIndex };
    });
  };

  // Fetch workspaces on component mount
  useEffect(() => {
    getAllWorkspaces()
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkspaces(data);
          const initialImageIndex = data.reduce((acc, workspace) => {
            if (workspace.photo && workspace.photo.length > 0) {
              acc[workspace._id] = 0;
            }
            return acc;
          }, {});
          setCurrentImageIndex(initialImageIndex);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching workspaces:", error));
  }, []);

  return (
    <div>
      {/* Workspace list */}
      <div className="flex flex-wrap gap-6">
        {Array.isArray(workspaces) &&
          workspaces.map((workspace) => (
            <div
              key={workspace._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              {/* Image carousel */}
              <div className="relative">
                {workspace.photo && workspace.photo.length > 0 ? (
                  <>
                    <img
                      className="rounded-t-lg object-cover"
                      src={workspace.photo[currentImageIndex[workspace._id]]}
                      alt={workspace.name}
                      style={{ width: "100%", height: "20em", maxWidth: "30em" }}
                    />
                    <span
                      onClick={() => handlePrevImage(workspace._id)}
                      className="absolute top-1/2 left-0 transform -translate-y-1/2  text-white p-1 rounded-full cursor-pointer"
                    >
                      &lt;
                    </span>
                    <span
                      onClick={() => handleNextImage(workspace._id)}
                      className="absolute top-1/2  right-0 transform -translate-y-1/2  text-white p-1 rounded-full cursor-pointer"
                    >
                      &gt;
                    </span>
                  </>
                ) : (
                  <div className="rounded-t-lg bg-gray-200 h-48 flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </div>

              {/* Workspace details */}
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

                {/* Buttons */}
                <button
                  onClick={() => {
                    setSelectedWorkspace(workspace);
                    setModalType("details");
                  }}
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
                  onClick={() => {
                    setSelectedWorkspace(workspace);
                    setModalType("reserve");
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-2"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Conditional modal rendering */}
      {modalType === "reserve" && selectedWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <RoomForm
            isOpen={true}
            toggleModal={closeModal}
            space={selectedWorkspace}
          />
        </div>
      )}
      {modalType === "details" && selectedWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <SpaceModal
            isOpen={true}
            toggleModal={closeModal}
            space={selectedWorkspace}
          />
        </div>
      )}
    </div>
  );
}