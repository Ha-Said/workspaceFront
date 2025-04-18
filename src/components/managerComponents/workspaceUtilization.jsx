import React, { useEffect, useState } from 'react';
import { getAllWorkspaces } from '../../ApiCalls/apiCalls';
import { FaChartLine } from 'react-icons/fa';

const WorkspaceUtilization = () => {
  const [utilizationData, setUtilizationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('month'); // month, week, or day
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUtilizationData = async () => {
      try {
        const workspaces = await getAllWorkspaces();

        // Calculate utilization for each workspace
        const workspaceStats = workspaces.map(workspace => {
          // Filter availability slots based on time range
          const now = new Date();
          let startDate;
          switch (timeRange) {
            case 'day':
              startDate = new Date(now.setHours(0, 0, 0, 0));
              break;
            case 'week':
              startDate = new Date(now.setDate(now.getDate() - 7));
              break;
            case 'month':
              startDate = new Date(now.setDate(1));
              break;
            default:
              startDate = new Date(now.setDate(1));
          }

          const relevantSlots = workspace.availability.filter(slot => {
            const slotStart = new Date(slot.startTime);
            return slotStart >= startDate;
          });

          // Calculate total booked hours
          const bookedHours = relevantSlots.reduce((total, slot) => {
            const start = new Date(slot.startTime);
            const end = new Date(slot.endTime);
            const hours = (end - start) / (1000 * 60 * 60);
            return total + hours;
          }, 0);

          // Calculate total available hours for the time range
          const totalAvailableHours = (new Date() - startDate) / (1000 * 60 * 60);

          // Calculate utilization percentage
          const utilizationPercentage = (bookedHours / totalAvailableHours) * 100;

          // Get the last booking time
          const lastBooking = relevantSlots.length > 0
            ? new Date(Math.max(...relevantSlots.map(slot => new Date(slot.endTime))))
            : null;

          return {
            workspaceId: workspace._id,
            name: workspace.name,
            type: workspace.type,
            capacity: workspace.capacity,
            totalBookings: relevantSlots.length,
            bookedHours: Math.round(bookedHours),
            utilization: Math.min(100, Math.round(utilizationPercentage)),
            lastBooking,
            pricePerHour: workspace.pricePerHour,
            location: workspace.location
          };
        });

        // Sort by utilization percentage
        const sortedStats = workspaceStats.sort((a, b) => b.utilization - a.utilization);
        setUtilizationData(sortedStats);
        setLoading(false);
      } catch (err) {
        setError('Failed to load utilization data');
        setLoading(false);
      }
    };

    fetchUtilizationData();
  }, [timeRange]);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const displayedData = showAll ? utilizationData : utilizationData.slice(0, itemsPerPage);

  return (
    <div className="bg-[#1E1E1E] rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Workspace Utilization</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('day')}
            className={`px-3 py-1 rounded ${
              timeRange === 'day'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#2D2D2D]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Workspace</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Utilization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Booked Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Bookings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Booking</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-[#1E1E1E] divide-y divide-gray-700">
            {displayedData.map((workspace) => (
              <tr key={workspace.workspaceId} className={workspace.utilization > 80 ? 'bg-red-900/20' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{workspace.name}</div>
                  <div className="text-xs text-gray-400">{workspace.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {workspace.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {workspace.capacity} people
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          workspace.utilization > 80
                            ? 'bg-red-500'
                            : workspace.utilization > 50
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${workspace.utilization}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-300">{workspace.utilization}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {workspace.bookedHours} hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {workspace.totalBookings}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {workspace.lastBooking
                    ? new Date(workspace.lastBooking).toLocaleDateString()
                    : 'No bookings'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${(workspace.bookedHours * workspace.pricePerHour).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {utilizationData.length > itemsPerPage && !showAll && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkspaceUtilization; 