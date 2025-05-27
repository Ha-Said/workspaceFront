import React, { useEffect, useState } from "react";
import { getAllWorkspaces } from "../../ApiCalls/apiCalls";
import { SpaceModal } from "../../components/userComponents/spaceModal";

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