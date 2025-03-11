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
          const memberId = user.id; // Adjust this line based on your user structure

          const data = await getBookingByMemberId(memberId);
          const pastBookings = data.filter(booking => new Date(booking.date) < new Date());
          setBookings(pastBookings);
          if (user.role !== "owner" && user.role !== "Member") {
            setError("Invalid user role.");
          }
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Login failed. Please try again."
        );
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Start Time
            </th>
            <th scope="col" className="px-6 py-3">
              End Time
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.slice(0, visibleBookings).map((booking) => (
            <tr
              key={booking._id} // Changed line to add unique key prop
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">{new Date(booking.date).toISOString().split('T')[0]}</td>
              <td className="px-6 py-4">{formatTime(booking.startTime)}</td>
              <td className="px-6 py-4">{formatTime(booking.endTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleBookings < bookings.length && (
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

const handleEditBooking = (bookingId) => {
  console.log(`Edit booking with id: ${bookingId}`);
};