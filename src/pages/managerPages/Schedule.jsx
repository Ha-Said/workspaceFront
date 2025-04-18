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
  const [activeView, setActiveView] = useState('month');
  const eventsService = useState(() => createEventsServicePlugin())[0];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        const formattedBookings = data.map((booking) => ({
          id: booking._id,
          title: `${booking.workspace.name} by ${booking.user?.name || 'Unknown'}`,
          start: booking.startTime.replace('T', ' ').slice(0, 16),
          end: booking.endTime.replace('T', ' ').slice(0, 16),
          backgroundColor: booking.status === 'confirmed' ? '#10B981' : '#F59E0B',
          borderColor: booking.status === 'confirmed' ? '#059669' : '#D97706',
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
    defaultView: activeView,
  });
  calendar.setTheme('dark');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Schedule Management
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            View and manage all workspace bookings and schedules
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 bg-white dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveView('day')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                activeView === 'day'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setActiveView('week')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                activeView === 'week'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveView('month')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                activeView === 'month'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setActiveView('month-agenda')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                activeView === 'month-agenda'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              Agenda
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-4">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Bookings
            </h2>
            <UpcomingBookingsTable />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Confirmed Bookings
            </h2>
            <ConfirmedBookings />
          </div>
        </div>
      </div>
    </div>
  );
}