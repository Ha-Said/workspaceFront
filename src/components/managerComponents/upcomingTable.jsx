import React, { useEffect, useState } from "react";
import { getAllBookings, setBookingCancelled, setBookingConfirmed, createPaiment, addAvailabilityToWorkspace } from "../../ApiCalls/apiCalls";

export default function UpcomingBookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        console.log("Fetched data:", data); // Log fetched data
        setBookings(data); // Correctly set bookings
        console.log("Updated bookings state:", data); 
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await setBookingCancelled(id);
      const updatedBookings = bookings.filter((booking) => booking.id !== id);
      setBookings(updatedBookings);
      console.log(`Booking with id ${id} cancelled successfully.`);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      console.log("Current bookings:", bookings);

      const confirmedBooking = bookings.find((booking) => booking._id === id); 
      console.log("Confirmed booking:", confirmedBooking);

      if (!confirmedBooking) {
        throw new Error(`Booking with ID ${id} not found.`);
      }

      await setBookingConfirmed(id);
      console.log(confirmedBooking);
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

      // Add availability to workspace
      const availabilityData = {
        startTime: confirmedBooking.startTime,
        endTime: confirmedBooking.endTime,
      };
      await addAvailabilityToWorkspace(confirmedBooking.workspace._id, availabilityData);

      const updatedBookings = bookings.filter((booking) => booking._id !== id);
      setBookings(updatedBookings);
      alert(`Booking with ID ${id} confirmed successfully.`);
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  const handleDetails = (id) => {
    console.log(`Show details for booking with id: ${id}`);
  };

  const handleShowMore = () => {
    setVisibleBookings((prevVisibleBookings) => prevVisibleBookings + 5);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.workspace?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || // Safely access workspace name
      booking._id.toLowerCase().includes(searchQuery.toLowerCase()) || // Use _id for filtering
      booking.startTime.toLowerCase().includes(searchQuery.toLowerCase()) || // Use startTime for filtering
      booking.endTime.toLowerCase().includes(searchQuery.toLowerCase()) // Use endTime for filtering
  );

  const upcomingBookings = filteredBookings.filter(
    (booking) => new Date(booking.startTime) > new Date() // Compare startTime with the current date
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold px-4 text-gray-700 dark:text-white">
          Upcoming Bookings
        </h2>
        <div className="relative px-4">
          <input
            type="text"
            id="table-search-users"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for bookings"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Space Name</th>
            <th scope="col" className="px-4 py-3">Start</th>
            <th scope="col" className="px-4 py-3">End</th>
            <th scope="col" className="px-4 py-3">Action</th>
            <th scope="col" className="px-4 py-3"></th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {upcomingBookings.slice(0, visibleBookings).map((booking) => (
            <tr
              key={booking._id} // Use booking._id as the unique key
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {booking.workspace?.name || "N/A"} {/* Safely access workspace name */}
              </td>
              <td className="px-4 py-3">{new Date(booking.startTime).toLocaleString()}</td> {/* Format start time */}
              <td className="px-4 py-3">{new Date(booking.endTime).toLocaleString()}</td> {/* Format end time */}
              <td className="px-4 py-3">
                <button
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => handleCancel(booking._id)}
                >
                  Cancel
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => handleConfirm(booking._id)}
                >
                  Confirm
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleDetails(booking._id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleBookings < upcomingBookings.length && (
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}