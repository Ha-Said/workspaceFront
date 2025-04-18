import React, { useEffect, useState } from "react";
import { getBookingByMemberId } from "../../ApiCalls/apiCalls";
import { UpdateBookingModal } from './updateBookingModal';
import { EmailForm } from './EmailInviteModal';

export function UpcomingAppointments() {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(10);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (token && user) {
          const memberId = user.id;
          const data = await getBookingByMemberId(memberId);
          const upcomingBookings = data.filter(booking => new Date(booking.date) >= new Date());
          setBookings(upcomingBookings);
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

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleInviteBooking = (booking) => {
    setSelectedBooking(booking);
    setIsInviteModalOpen(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upcoming Appointments</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Date</th>
                <th scope="col" className="px-6 py-3 font-medium">Start Time</th>
                <th scope="col" className="px-6 py-3 font-medium">End Time</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
                <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookings.slice(0, visibleBookings).map((booking, index) => (
                <tr
                  key={booking.id || index}
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
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditBooking(booking)}
                      disabled={booking.status === "confirmed" || booking.status === "cancelled"}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        booking.status === "confirmed" || booking.status === "cancelled"
                          ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      }`}
                      title={
                        booking.status === "confirmed"
                          ? "Your booking is confirmed. You can no longer update it."
                          : booking.status === "cancelled"
                          ? "This booking is cancelled. You cannot edit it."
                          : ""
                      }
                    >
                      Edit
                    </button>
                    {booking.status !== "pending" && (
                      <button
                        onClick={() => handleInviteBooking(booking)}
                        disabled={booking.status === "cancelled"}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          booking.status === "cancelled"
                            ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                            : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                        }`}
                        title={booking.status === "cancelled" ? "This booking is cancelled. You cannot send an invite." : ""}
                      >
                        Invite
                      </button>
                    )}
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

      <UpdateBookingModal
        isOpen={isModalOpen}
        toggleModal={() => setIsModalOpen(false)}
        booking={selectedBooking}
      />
      <EmailForm
        isOpen={isInviteModalOpen}
        toggleModal={() => setIsInviteModalOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
}
