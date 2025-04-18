import React, { useEffect, useState } from "react";
import { getBookingByMemberId } from "../../ApiCalls/apiCalls";

export function PastAppointments() {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (token && user) {
          const memberId = user.id;
          const data = await getBookingByMemberId(memberId);
          const pastBookings = data.filter(booking => new Date(booking.date) < new Date());
          setBookings(pastBookings);
          if (user.role !== "owner" && user.role !== "Member") {
            setError("Invalid user role.");
          }
        }
      } catch (error) {
        setError(error.response?.data?.message || "Login failed. Please try again.");
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleShowMore = () => {
    setVisibleBookings((prevVisibleBookings) => prevVisibleBookings + 10);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Past Appointments</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Date</th>
                <th scope="col" className="px-6 py-3 font-medium">Start Time</th>
                <th scope="col" className="px-6 py-3 font-medium">End Time</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookings.slice(0, visibleBookings).map((booking) => (
                <tr
                  key={booking._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {new Date(booking.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {formatTime(booking.startTime)}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {formatTime(booking.endTime)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleBookings < bookings.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const handleEditBooking = (bookingId) => {
  console.log(`Edit booking with id: ${bookingId}`);
};