import React, { useEffect, useState } from "react";
import {
  getAllBookings,
  setBookingCancelled,
  setBookingConfirmed,
  createPaiment,
  addAvailabilityToWorkspace,
  createActionLog,
} from "../../ApiCalls/apiCalls";
import BookingDetails from "./bookingInfoCard";

// Reusable Modal Component
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

export default function UpcomingBookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getAllBookings();
        setBookings(data);
        // Get current user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setCurrentUser(storedUser);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  // Cancel booking
  const handleCancel = async (id) => {
    try {
      const bookingToCancel = bookings.find((booking) => booking._id === id);
      if (!bookingToCancel) throw new Error(`Booking ${id} not found.`);

      await setBookingCancelled(id);
      
      // Create action log for cancellation
      if (currentUser) {
        const actionLogData = {
          action: 'cancelled booking',
          userId: currentUser.id,
          details: `Booking cancelled for workspace: ${bookingToCancel.workspace?.name || 'Unknown'}`,
          entityId: id,
          entityType: 'booking'
        };
        console.log('Sending cancellation action log data:', actionLogData);
        await createActionLog(actionLogData);
      }
      
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  // Confirm booking with associated actions
  const handleConfirm = async (id) => {
    try {
      const confirmedBooking = bookings.find((booking) => booking._id === id);
      if (!confirmedBooking) throw new Error(`Booking ${id} not found.`);

      await setBookingConfirmed(id);
      
      // Create action log for confirmation
      if (currentUser) {
        const actionLogData = {
          action: 'confirming booking',
          userId: currentUser.id,
          details: `Booking confirmed for workspace: ${confirmedBooking.workspace?.name || 'Unknown'}`,
          entityId: id,
          entityType: 'booking'
        };
        console.log('Sending confirmation action log data:', actionLogData);
        await createActionLog(actionLogData);
      }

      const startTime = new Date(confirmedBooking.startTime);
      const endTime = new Date(confirmedBooking.endTime);
      const hours = Math.abs(endTime - startTime) / 36e5;
      const amount = hours * confirmedBooking.workspace.pricePerHour;
      
      const paimentData = {
        amount,
        date: new Date(),
        member: confirmedBooking.user,
        space: confirmedBooking.workspace,
        dueDate: new Date(confirmedBooking.endTime),
      };

      await createPaiment(paimentData);
      
      // Create action log for payment creation
      if (currentUser) {
        const paymentActionLogData = {
          action: 'created payment',
          userId: currentUser.id,
          details: `Payment created for booking: ${amount} for ${hours} hours`,
          entityId: confirmedBooking._id,
          entityType: 'payment'
        };
        console.log('Sending payment action log data:', paymentActionLogData);
        await createActionLog(paymentActionLogData);
      }

      await addAvailabilityToWorkspace(confirmedBooking.workspace._id, {
        startTime: confirmedBooking.startTime,
        endTime: confirmedBooking.endTime,
      });

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      alert(`Booking ${id} confirmed successfully.`);
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  // Open details modal
  const handleDetails = (id) => {
    setSelectedBookingId(id);
  };

  // Show more bookings
  const handleShowMore = () => {
    setVisibleBookings((prev) => prev + 5);
  };

  // Filter bookings based on search and date criteria
  const filteredBookings = bookings.filter((booking) => {
    const search = searchQuery.toLowerCase();
    return (
      booking.status === 'pending' && (  // Only show pending bookings
        booking.workspace?.name?.toLowerCase().includes(search) ||
        booking._id.toLowerCase().includes(search) ||
        booking.startTime.toLowerCase().includes(search) ||
        booking.endTime.toLowerCase().includes(search)
      )
    );
  });

  const upcomingBookings = filteredBookings.filter(
    (booking) => new Date(booking.startTime) > new Date()
  );

  return (
    <div className="p-4">
      <header className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white">
          Upcoming Bookings
        </h2>
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
            {upcomingBookings.slice(0, visibleBookings).map((booking) => (
              <tr
                key={booking._id}
                className="bg-white dark:bg-gray-800 border-b hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3">
                  {booking.workspace?.name || "N/A"}
                </td>
                <td className="px-4 py-3">
                  {new Date(booking.startTime).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {new Date(booking.endTime).toLocaleString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                    onClick={() => handleConfirm(booking._id)}
                  >
                    Confirm
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

      {visibleBookings < upcomingBookings.length && (
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
