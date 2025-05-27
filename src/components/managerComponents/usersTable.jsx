import React, { useEffect, useState, useRef } from "react";
import { getUsers, archiveMember, setMemberToManagerRole } from "../../ApiCalls/apiCalls";

function UserRow({ user, onDelete, onAssignManager }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <tr
      key={user._id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          className="w-10 h-10 rounded-full"
          src={user?.photo ? `http://localhost:5000/${user.photo}` : 'http://localhost:5000/uploads/placeholder.jpg'}
        />
        <div className="ps-3">
          <div className="text-base font-semibold">{user.name}</div>
          <div className="font-normal text-gray-500">{user.email}</div>
        </div>
      </th>
      <td className="px-6 py-4 border-b">{user.email}</td>
      <td className="px-6 py-4 border-b">{user.phone}</td>
      <td className="px-6 py-4 border-b">
        {user.behaviourScore && (
          <div className="flex flex-col">
            <span>Total Score: {user.behaviourScore.totalScore}</span>
            <span>No Shows: {user.behaviourScore.noShows}</span>
            <span>Past Bookings: {user.behaviourScore.pastBookings}</span>
            <span>Violations: {user.behaviourScore.violations}</span>
          </div>
        )}
      </td>
      <td className="text-right">
        <div className="relative inline-block" ref={menuRef}>
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="4" cy="10" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="16" cy="10" r="2" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => { setMenuOpen(false); onDelete(user); }}
              >
                Delete
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => { setMenuOpen(false); onAssignManager(user); }}
              >
                Assign Manager
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export function TableCard() {
  const [users, setUsers] = useState([]);
  const [visibleActiveUsers, setVisibleActiveUsers] = useState(10);
  const [visibleArchivedUsers, setVisibleArchivedUsers] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleShowMoreActive = () => {
    setVisibleActiveUsers((prev) => prev + 10);
  };

  const handleShowMoreArchived = () => {
    setVisibleArchivedUsers((prev) => prev + 10);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (userId) => {
    try {
      console.log('Attempting to archive user with ID:', userId);
      console.log('Current user data:', users.find(user => user._id === userId));
      
      await archiveMember(userId);
      
      console.log('User archived successfully:', userId);
      // Update the user's archived status in the local state
      setUsers(users.map(user => {
        if (user._id === userId) {
          const updatedUser = {
            ...user,
            behaviourScore: {
              ...user.behaviourScore,
              archived: true
            }
          };
          console.log('Updated user data:', updatedUser);
          return updatedUser;
        }
        return user;
      }));
    } catch (error) {
      console.error("Error archiving user:", error);
    }
  };

  const handleAssignManager = async (userId) => {
    try {
      await setMemberToManagerRole(userId);
      console.log(`Assigned manager role to user with ID: ${userId}`);
    } catch (error) {
      console.error("Error assigning manager role:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMembers = filteredUsers.filter(user => 
    user.role === 'Member' && (!user.behaviourScore?.archived || user.behaviourScore?.archived === false)
  );

  const archivedMembers = filteredUsers.filter(user => 
    user.role === 'Member' && user.behaviourScore && user.behaviourScore.archived === true
  );

  const renderTable = (users, visibleCount, showMoreHandler, title) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 border-b">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Email
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Behaviour Score
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, visibleCount).map((user) => (
              <UserRow
                key={user._id}
                user={user}
                onDelete={handleDelete}
                onAssignManager={handleAssignManager}
              />
            ))}
          </tbody>
        </table>
        {visibleCount < users.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={showMoreHandler}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="text-white">
      {renderTable(activeMembers, visibleActiveUsers, handleShowMoreActive, "Active Members")}
      {renderTable(archivedMembers, visibleArchivedUsers, handleShowMoreArchived, "Archived Members")}
    </div>
  );
}