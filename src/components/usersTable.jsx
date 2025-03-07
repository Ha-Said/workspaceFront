import React, { useEffect, useState } from "react";
import { getUsers } from "../ApiCalls/apiCalls";
import { Link } from "react-router-dom"; // import Link

export function TableCard() {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(10);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleShowMore = () => {
    setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 10);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, visibleUsers).map((user) => (
            <tr
              key={user.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
              >
                <img
                  className="h-8 w-8 rounded-full mr-2"
                  src={user.photo}
                  alt={`${user.name}'s profile`}
                />
                {user.name}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">
                {/* Change Edit link to include the user email in the URL */}
                <Link
                  to={`/editProfile/${user.email}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleUsers < users.length && (
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
