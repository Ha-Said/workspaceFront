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
import UpcomingBookingsTable from '../../components/managerComponents/upcomingTable';
import ConfirmedBookings from '../../components/managerComponents/confirmedBookings';

export default function CalendarApp() {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const eventsService = useState(() => createEventsServicePlugin())[0];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        const formattedBookings = data.map((booking) => ({
          id: booking._id,
          title: `${booking.workspace.name} by `,
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


  const calendar = createCalendar({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: bookings,
    plugins: [eventsService],
  });
  calendar.setTheme('dark');

  return (
    <div className="flex flex-col">
      <div className="w-full mb-6">
        <div className="shadow-md sm:rounded-lg overflow-hidden">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-1/2">
          <UpcomingBookingsTable />
        </div>
        <div className="w-full lg:w-1/2">
          <ConfirmedBookings />
        </div>
      </div>
    </div>
  );
}