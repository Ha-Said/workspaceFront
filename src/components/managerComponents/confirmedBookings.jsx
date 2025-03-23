import React, { useEffect, useState } from "react";
import { getAllBookings, setBookingCancelled } from "../../ApiCalls/apiCalls";
import BookingDetails from "./bookingInfoCard";

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ConfirmedBookings() {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getAllBookings();
        setBookings(data.filter((booking) => booking.status === "confirmed"));
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await setBookingCancelled(id);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleDetails = (id) => {
    setSelectedBookingId(id);
  };

  const handleShowMore = () => {
    setVisibleBookings((prev) => prev + 5);
  };

  const filteredBookings = bookings.filter((booking) => {
    const search = searchQuery.toLowerCase();
    return (
      booking.workspace?.name?.toLowerCase().includes(search) ||
      booking._id.toLowerCase().includes(search) ||
      booking.startTime.toLowerCase().includes(search) ||
      booking.endTime.toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-4">
      <header className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white">Confirmed Bookings</h2>
        <input
          type="text"
          placeholder="Search for bookings"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2 md:mt-0 px-4 py-2 border rounded-lg w-80 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Space Name</th>
              <th className="px-4 py-3">Start</th>
              <th className="px-4 py-3">End</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.slice(0, visibleBookings).map((booking) => (
              <tr
                key={booking._id}
                className="bg-white dark:bg-gray-800 border-b hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3">{booking.workspace?.name || "N/A"}</td>
                <td className="px-4 py-3">{new Date(booking.startTime).toLocaleString()}</td>
                <td className="px-4 py-3">{new Date(booking.endTime).toLocaleString()}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => handleDetails(booking._id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleBookings < filteredBookings.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Show More
          </button>
        </div>
      )}

      {selectedBookingId && (
        <Modal onClose={() => setSelectedBookingId(null)}>
          <BookingDetails bookingId={selectedBookingId} />
        </Modal>
      )}
    </div>
  );
}
