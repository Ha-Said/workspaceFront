import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 import { useState,useEffect } from 'react'
import '@schedule-x/theme-default/dist/index.css'
 
export function CalendarApp() {
    const now = new Date();
const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const eventsService = useState(() => createEventsServicePlugin())[0]
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        "id": 1,
        "start": "2025-03-03 16:17",
        "end": "2025-03-03 17:17"
      },
    ],
    plugins: [eventsService]
  })
 
calendar.setTheme('dark')
  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 