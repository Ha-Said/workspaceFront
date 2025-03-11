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
        const data = await getAllBookings();
        const formattedBookings = data.map((booking) => ({
          id: booking._id,
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full h-2/3">
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
          <UpcomingAppointments />
        </div>
        <div className="w-full lg:w-1/2 p-4">
        
        <h2 className="text-lg font-bold mb-4 text-white">Past Bookings</h2>
          <PastAppointments />
        </div>
      </div>
    </div>
  );
}