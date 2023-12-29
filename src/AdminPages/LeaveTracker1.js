import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../components/Sidebar';

const localizer = momentLocalizer(moment);

const now = new Date();
const events = [
  {
    id: 0,
    title: 'Meeting',
    start: moment({ hours: 8 }).toDate(),
    end: moment({ hours: 10 }).toDate(),
  },
  {
    id: 1,
    title: 'Lunch',
    start: moment({ hours: 12 }).toDate(),
    end: moment({ hours: 13 }).toDate(),
  },
  {
    id: 2,
    title: 'Coding',
    start: moment({ hours: 14 }).toDate(),
    end: moment({ hours: 17 }).toDate(),
  },
];

const LeaveTracker1 = () => (
    <>
    <Sidebar/>
    <main className='m-5'>
        <h3 className='mb-3'>Leave Calendar</h3>
  <BigCalendar
    events={events}
    localizer={localizer}
    components={{
      eventWrapper: ({ event, children }) => (
        <div
          onContextMenu={(e) => {
            alert(`${event.title} is clicked.`);
            e.preventDefault();
          }}
        >
          {children}
        </div>
      ),
    }}
    style={{ height: 500 }}
  /></main>
  </>
);

export default LeaveTracker1;
