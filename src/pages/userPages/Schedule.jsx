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
import { UserModalForm } from '../../components/userComponents/modalForm';
import { UpcomingAppointments } from '../../components/userComponents/upcomingAppointments';
import { PastAppointments } from '../../components/userComponents/pastAppointments';

export default function UserCalendar() {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const eventsService = useState(() => createEventsServicePlugin())[0];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (token && user && user.id) { // Added null check for user and user.id
          const userId = user.id; 
          const data = await getAllBookings();
          console.log(data);
          const formattedBookings = data.map((booking) => ({
            id: booking._id,
            title: `${booking.workspace.name} (${booking.status})`,
            start: booking.startTime.replace('T', ' ').slice(0, 16),
            end: booking.endTime.replace('T', ' ').slice(0, 16),
            calendarId: booking.user && booking.user._id === userId ? 'user' : 'other', // Added null check for booking.user
          }));
          setBookings(formattedBookings); 
          console.log(formattedBookings);
          eventsService.set(formattedBookings);
        }
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
    calendars: {
      user: {
        colorName: 'user',
        lightColors: {
          main: '#0e7a5a',
          container: '#0b5a42',
          onContainer: '#ffffff',
        },
        darkColors: {
          main: '#0b5a42',
          onContainer: '#ffffff',
          container: '#083f30',
        },
      },
      other: {
        colorName: 'other',
        lightColors: {
          main: '#7a0e1e',
          container: '#5a0b16',
          onContainer: '#ffffff',
        },
        darkColors: {
          main: '#5a0b16',
          onContainer: '#ffffff',
          container: '#3f0810',
        },
      },
    },
  });
  calendar.setTheme('light');

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full h-2/3 relative">
        <div className="absolute top-4 right-4 flex space-x-2">
          <span className="bg-[#0e7a5a] text-white text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-[#0b5a42] dark:text-white">
            Your Bookings
          </span>
          <span className="bg-[#7a0e1e] text-white text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-[#5a0b16] dark:text-white">
            Other's Bookings
          </span>
        </div>
        <div className="shadow-md sm:rounded-lg overflow-hidden h-full">
          <button
            onClick={toggleModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
          >
            Add Booking
          </button>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
        <UserModalForm isOpen={isModalOpen} toggleModal={toggleModal} />
      </div>
      <div className="w-full h-1/3 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-lg font-bold mb-4 text-white">Upcoming Bookings</h2>
          <UpcomingAppointments>
            {upcomingBookings.slice(0, visibleBookings).map((booking) => (
              <div key={booking.id} className="flex justify-between items-center mb-2">
                <span>{booking.title}</span>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ))}
            {upcomingBookings.length > visibleBookings && (
              <button
                onClick={handleShowMore}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Show More
              </button>
            )}
          </UpcomingAppointments>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-lg font-bold mb-4 text-white">Past Bookings</h2>
          <PastAppointments />
        </div>
      </div>
    </div>
  );
}