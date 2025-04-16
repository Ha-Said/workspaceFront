import React, { useEffect, useState } from 'react';
import { getUserRankings } from '../../ApiCalls/apiCalls';
import { FaStar } from 'react-icons/fa';

const ManagerRanks = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await getUserRankings();
        setRankings(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load rankings');
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-[#1E1E1E] rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">User Rankings This Month</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#2D2D2D]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#1E1E1E] divide-y divide-gray-700">
            {rankings.map((user, index) => (
              <tr key={user.userId} className={index % 2 === 0 ? 'bg-[#1E1E1E]' : 'bg-[#2D2D2D]'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {index === 0 ? (
                    <div className="flex items-center">
                      <span className="mr-2">1</span>
                      <FaStar className="text-yellow-400" />
                    </div>
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user?.photo ? `http://localhost:5000/${user.photo}` : 'http://localhost:5000/uploads/placeholder.jpg'}
                      alt={user.name}
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-300">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.actionCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(user.lastAction).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerRanks;
