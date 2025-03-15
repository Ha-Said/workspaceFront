import React, { useEffect, useState } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { getAllBookings } from '../../ApiCalls/apiCalls';
import '@schedule-x/theme-default/dist/index.css';

export default function CalendarApp() {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const eventsService = useState(() => createEventsServicePlugin())[0];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        const formattedBookings = data.map((booking) => ({
          id: booking._id,
          title: `Booking ${booking._id}`,
          start: booking.startTime.replace('T', ' ').slice(0, 16),
          end: booking.endTime.replace('T', ' ').slice(0, 16),
        }));
        setBookings(formattedBookings);
        eventsService.set(formattedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [eventsService]);

  const handleCancel = (id) => {
    console.log(`Cancel booking with id: ${id}`);
  };

  const handleShowMore = () => {
    setVisibleBookings((prevVisibleBookings) => prevVisibleBookings + 5);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.start.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.end.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingBookings = filteredBookings.filter((booking) => 
    new Date(booking.start) > new Date()
  );

  const calendar = createCalendar({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: bookings,
    plugins: [eventsService],
  });
  calendar.setTheme('dark');

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/4 mb-6 lg:mb-0 lg:pr-4">
        <div className="shadow-md sm:rounded-lg overflow-hidden">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>
      <div className="w-full lg:w-1/4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold px-4 text-gray-700 dark:text-white">Upcoming Bookings</h2>
            <div className="relative px-4">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                
              </div>
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
                <th scope="col" className="px-4 py-3">ID</th>
                <th scope="col" className="px-4 py-3">Start</th>
                <th scope="col" className="px-4 py-3">End</th>
                <th scope="col" className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {upcomingBookings.slice(0, visibleBookings).map((booking) => (
                <tr key={booking.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{booking.id}</td>
                  <td className="px-4 py-3">{booking.start}</td>
                  <td className="px-4 py-3">{booking.end}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel
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
      </div>
    </div>
  );
}