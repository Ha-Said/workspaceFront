import React, { useEffect, useState } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { getAllBookings } from '../ApiCalls/apiCalls';
import '@schedule-x/theme-default/dist/index.css'
 
export function CalendarApp() {
  const [bookings, setBookings] = useState([]);
  const eventsService = useState(() => createEventsServicePlugin())[0]
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
  
  console.log(bookings)
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: bookings,
    plugins: [eventsService]
    
  }
)
 
  useEffect(() => {
    eventsService.getAll()
  }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
  