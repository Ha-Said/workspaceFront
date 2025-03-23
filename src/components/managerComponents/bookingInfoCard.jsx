import { useEffect, useState } from "react";
import { getBookingById } from "../../ApiCalls/apiCalls";

const BookingDetails = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p>Loading booking details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!booking) return <p>No booking found.</p>;

  return (
    <div className="max-w-md p-8 bg-white border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Booking Details
      </h5>
      <img 
        className="w-full h-48 object-cover rounded-xl border border-gray-200 mb-6 dark:border-gray-600"
        src={booking.workspace.photo} 
        alt={booking.workspace.name} 
      />
      
      <div className="space-y-4 text-gray-600 dark:text-gray-300">
        <div className="flex justify-between items-center">
          <span className="font-semibold">User:</span>
          <span className="text-right">
            {booking.user.name}<br/>
            <span className="text-gray-500 dark:text-gray-400">{booking.user.email}</span>
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-semibold">Workspace:</span>
          <span className="text-right">
            {booking.workspace.name}<br/>
            <span className="text-gray-500 dark:text-gray-400">{booking.workspace.type}</span>
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Date:</span>
          <span>{new Date(booking.date).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Time:</span>
          <span>
            {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
            {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <span className="font-semibold">Status:</span>
          <span 
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : booking.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {booking.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
