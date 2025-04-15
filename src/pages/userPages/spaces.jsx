import React, { useEffect, useState, useRef } from "react";
import { getAllWorkspaces } from "../../ApiCalls/apiCalls";
import { RoomForm } from "../../components/userComponents/modalRoomForm";
import { SpaceModal } from "../../components/userComponents/spaceModal";

function FilterPopup({
  isOpen,
  onClose,
  onApply,
  priceFilter,
  capacityFilter,
  dateFilter,
  startTimeFilter,
  endTimeFilter,
  setPriceFilter,
  setCapacityFilter,
  setDateFilter,
  setStartTimeFilter,
  setEndTimeFilter,
}) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="absolute z-10 w-80 p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 mt-10 border border-gray-300 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h6 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h6>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
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
          <span className="sr-only">Close filters</span>
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Max Price (DT)
          </label>
          <input
            type="number"
            placeholder="Enter max price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded focus:ring-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Min Capacity
          </label>
          <input
            type="number"
            placeholder="Enter min capacity"
            value={capacityFilter}
            onChange={(e) => setCapacityFilter(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded focus:ring-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded focus:ring-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Time
            </label>
            <input
              type="time"
              value={startTimeFilter}
              onChange={(e) => setStartTimeFilter(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded focus:ring-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Time
            </label>
            <input
              type="time"
              value={endTimeFilter}
              onChange={(e) => setEndTimeFilter(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded focus:ring-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              setPriceFilter("");
              setCapacityFilter("");
              setDateFilter("");
              setStartTimeFilter("");
              setEndTimeFilter("");
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserSpaces() {
  // State declarations
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [startTimeFilter, setStartTimeFilter] = useState("");
  const [endTimeFilter, setEndTimeFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          setFilteredWorkspaces(data); // set initial filtered workspaces to all workspaces
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching workspaces:", error));
  }, []);

  // Check if a workspace is available for the selected time slot
  const isWorkspaceAvailable = (workspace) => {
    // If no date or time filters are set, consider the workspace available
    if (!dateFilter || !startTimeFilter || !endTimeFilter) {
      return true;
    }

    // Parse requested date and times
    const requestDate = new Date(dateFilter);
    const [startHours, startMinutes] = startTimeFilter.split(":").map(Number);
    const [endHours, endMinutes] = endTimeFilter.split(":").map(Number);

    // Create Date objects for the requested start and end times
    const requestStart = new Date(requestDate);
    requestStart.setHours(startHours, startMinutes, 0, 0);

    const requestEnd = new Date(requestDate);
    requestEnd.setHours(endHours, endMinutes, 0, 0);

    // If end time is before or equal to start time, the request is invalid
    if (requestEnd <= requestStart) {
      return false;
    }

    // If workspace has no availability data, consider it available
    if (!workspace.availability || !Array.isArray(workspace.availability) || workspace.availability.length === 0) {
      return true;
    }

    // Check for overlapping bookings
    for (const booking of workspace.availability) {
      // Skip entries with 'available' status since they don't represent bookings
      if (booking.status === 'available') {
        continue;
      }
      
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);

      // Check if the booking date matches the requested date
      const isSameDate =
        requestDate.getFullYear() === bookingStart.getFullYear() &&
        requestDate.getMonth() === bookingStart.getMonth() &&
        requestDate.getDate() === bookingStart.getDate();

      if (!isSameDate) {
        continue;
      }

      // Check for time overlap
      const hasOverlap = requestStart < bookingEnd && requestEnd > bookingStart;
      
      if (hasOverlap) {
        return false; // Workspace is not available due to overlapping booking
      }
    }

    return true; // Workspace is available for the requested time
  };

  // Filter workspaces based on price, capacity, and availability
  const filterWorkspaces = () => {
    const filtered = workspaces.filter((workspace) => {
      const matchesPrice =
        priceFilter === "" || workspace.pricePerHour <= parseFloat(priceFilter);
      const matchesCapacity =
        capacityFilter === "" || workspace.capacity >= parseInt(capacityFilter);
      const matchesAvailability = isWorkspaceAvailable(workspace);

      return matchesPrice && matchesCapacity && matchesAvailability;
    });

    setFilteredWorkspaces(filtered);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      {/* Filters */}
      <div className="flex p-4 relative">
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Filter by category
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <FilterPopup
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          onApply={filterWorkspaces}
          priceFilter={priceFilter}
          capacityFilter={capacityFilter}
          dateFilter={dateFilter}
          startTimeFilter={startTimeFilter}
          endTimeFilter={endTimeFilter}
          setPriceFilter={setPriceFilter}
          setCapacityFilter={setCapacityFilter}
          setDateFilter={setDateFilter}
          setStartTimeFilter={setStartTimeFilter}
          setEndTimeFilter={setEndTimeFilter}
        />
      </div>

      {/* Active Filters Display */}
      {(dateFilter || priceFilter || capacityFilter) && (
        <div className="flex flex-wrap items-center gap-2 px-4 mb-4">
          <span className="font-medium text-gray-700 dark:text-gray-300">Active Filters:</span>
          {dateFilter && (
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
              Date: {new Date(dateFilter).toLocaleDateString()}
            </span>
          )}
          {startTimeFilter && endTimeFilter && (
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
              Time: {startTimeFilter} - {endTimeFilter}
            </span>
          )}
          {priceFilter && (
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
              Max Price: {priceFilter} DT
            </span>
          )}
          {capacityFilter && (
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
              Min Capacity: {capacityFilter}
            </span>
          )}
          <button
            onClick={() => {
              setPriceFilter("");
              setCapacityFilter("");
              setDateFilter("");
              setStartTimeFilter("");
              setEndTimeFilter("");
              setFilteredWorkspaces(workspaces); // Reset to all workspaces when clearing filters
            }}
            className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-full hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
          >
            Clear All
          </button>
        </div>
      )}

      {/* No Results Message */}
      {filteredWorkspaces.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No workspaces match your filter criteria.
          </p>
          <button
            onClick={() => {
              setPriceFilter("");
              setCapacityFilter("");
              setDateFilter("");
              setStartTimeFilter("");
              setEndTimeFilter("");
              setFilteredWorkspaces(workspaces); // Reset to all workspaces when clearing filters
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded hover:bg-blue-800"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Workspace list */}
      <div className="flex flex-wrap gap-6">
        {Array.isArray(filteredWorkspaces) &&
          filteredWorkspaces.map((workspace) => (
            <div
              key={workspace._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105"
            >
              {/* Image carousel */}
              <div className="relative">
                {workspace.photo && workspace.photo.length > 0 ? (
                  <img
                    className="rounded-t-lg object-cover"
                    src={`http://localhost:5000/${workspace.photo[currentImageIndex[workspace._id]]}`}
                    alt={workspace.name}
                    style={{ width: "100%", height: "20em", maxWidth: "30em" }}
                  />
                ) : (
                  <div className="rounded-t-lg bg-gray-200 h-48 flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </div>

              {/* Workspace details */}
              <div className="p-6">
                <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {workspace.name}
                </h5>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                  <strong>Type:</strong> {workspace.type}
                </p>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                  <strong>Capacity:</strong> {workspace.capacity}
                </p>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                  <strong>Amenities:</strong> {workspace.amenities.join(", ")}
                </p>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                  <strong>Location:</strong> {workspace.location}
                </p>
                <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
                  <strong>Price per hour:</strong> {workspace.pricePerHour} DT
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setSelectedWorkspace(workspace);
                      setModalType("details");
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                  </button>
                  <button
                    onClick={() => {
                      setSelectedWorkspace(workspace);
                      setModalType("reserve");
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Conditional modal rendering */}
      {modalType === "reserve" && selectedWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <RoomForm isOpen={true} toggleModal={closeModal} space={selectedWorkspace} />
        </div>
      )}
      {modalType === "details" && selectedWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <SpaceModal isOpen={true} toggleModal={closeModal} space={selectedWorkspace} />
        </div>
      )}
    </div>
  );
}