import React, { useEffect, useState, useRef } from "react";
import { getAllWorkspaces } from "../../ApiCalls/apiCalls";
import { SpaceModal } from "../../components/userComponents/spaceModal";

// Filter Popup Component
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
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [priceFilter, setPriceFilter] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [startTimeFilter, setStartTimeFilter] = useState('');
  const [endTimeFilter, setEndTimeFilter] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleWorkspaceClick = (workspace) => {
    setSelectedWorkspace(workspace);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkspace(null);
  };

  const isWorkspaceAvailable = (workspace) => {
    if (!dateFilter || !startTimeFilter || !endTimeFilter) {
      return true;
    }

    const requestDate = new Date(dateFilter);
    const [startHours, startMinutes] = startTimeFilter.split(":").map(Number);
    const [endHours, endMinutes] = endTimeFilter.split(":").map(Number);

    const requestStart = new Date(requestDate);
    requestStart.setHours(startHours, startMinutes, 0, 0);

    const requestEnd = new Date(requestDate);
    requestEnd.setHours(endHours, endMinutes, 0, 0);

    if (requestEnd <= requestStart) {
      return false;
    }

    if (!workspace.availability || !Array.isArray(workspace.availability) || workspace.availability.length === 0) {
      return true;
    }

    for (const booking of workspace.availability) {
      if (booking.status === 'available') {
        continue;
      }
      
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);

      const isSameDate =
        requestDate.getFullYear() === bookingStart.getFullYear() &&
        requestDate.getMonth() === bookingStart.getMonth() &&
        requestDate.getDate() === bookingStart.getDate();

      if (!isSameDate) {
        continue;
      }

      const hasOverlap = requestStart < bookingEnd && requestEnd > bookingStart;
      
      if (hasOverlap) {
        return false;
      }
    }

    return true;
  };

  const filterWorkspaces = () => {
    setIsDropdownOpen(false);
  };

  const filteredWorkspaces = workspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workspace.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || workspace.type === filterType;
    const matchesPrice = !priceFilter || workspace.pricePerHour <= parseFloat(priceFilter);
    const matchesCapacity = !capacityFilter || workspace.capacity >= parseInt(capacityFilter);
    const matchesAvailability = isWorkspaceAvailable(workspace);

    return matchesSearch && matchesType && matchesPrice && matchesCapacity && matchesAvailability;
  });

  const uniqueTypes = ['all', ...new Set(workspaces.map(workspace => workspace.type))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
          Available Workspaces
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="block w-full md:w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          
          {/* Filter Button and Popup */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="block w-full md:w-auto px-4 py-2 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="button"
            >
              More Filters
              <svg
                className="w-4 h-4 ml-2 inline"
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
        </div>
      </div>

      {/* Active Filters Display */}
      {(dateFilter || priceFilter || capacityFilter) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
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
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded hover:bg-blue-800"
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkspaces.map(workspace => (
          <div 
            key={workspace._id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => handleWorkspaceClick(workspace)}
          >
            <div className="relative h-48">
              <img 
                className="w-full h-full object-cover" 
                src={workspace.photo && workspace.photo.length > 0 ? `http://localhost:5000/${workspace.photo[0]}` : '/uploads/placeholder.jpg'} 
                alt={workspace.name} 
              />
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  {workspace.type}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{workspace.name}</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {workspace.location}
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Capacity: {workspace.capacity} people
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ${workspace.pricePerHour}/hour
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SpaceModal 
        isOpen={isModalOpen} 
        toggleModal={closeModal} 
        space={selectedWorkspace} 
      />
    </div>
  );
}