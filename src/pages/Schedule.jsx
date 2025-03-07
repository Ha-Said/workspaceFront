import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { useState, useEffect } from 'react';
import '@schedule-x/theme-default/dist/index.css';
import {ModalForm} from '../components/modalForm';
import UserList from '../components/list';
export function CalendarApp() {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: 1,
        start: '2025-03-03 16:17',
        end: '2025-03-03 17:17',
      },
    ],
    plugins: [eventsService],
  });

  calendar.setTheme('dark');
  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleModal}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add Event
      </button>
      <div className='flex'> 
      <ScheduleXCalendar calendarApp={calendar} />
      <ModalForm isOpen={isModalOpen} toggleModal={toggleModal} />
      <UserList /></div>
    </div>
  );
}