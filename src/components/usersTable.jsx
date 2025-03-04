import React, { useEffect, useState } from "react";
import { getUsers } from '../ApiCalls/apiCalls';

export function TableCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from the API
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="relative overflow-x-auto rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-gray-800 dark:bg-gray-800 dark:text-gray-300">
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
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="bg-gray-700 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-blue-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-gray-300 flex items-center">
                <img
                  className="h-8 w-8 rounded-full mr-2"
                  src={user.photo}
                  alt={`${user.name}'s profile`}
                />
                {user.name}
              </th>
              <td className="px-6 py-4">
                {user.email}
              </td>
              <td className="px-6 py-4">
                {user.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}