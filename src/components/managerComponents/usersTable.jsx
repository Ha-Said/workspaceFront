import React, { useEffect, useState } from "react";
import { getUsers, deleteMember, setMemberToManagerRole } from "../../ApiCalls/apiCalls";
import DropDownMenu from "./dropdown";

export function TableCard() {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleShowMore = () => {
    setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 10);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteMember(userId);
      setUsers(users.filter(user => user._id !== userId));
      console.log(`Deleted user with ID: ${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
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

  return (
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.slice(0, visibleUsers).map((user) => (
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
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAssignManager(user._id)}
                    className="px-2 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Assign Manager
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleUsers < filteredUsers.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}