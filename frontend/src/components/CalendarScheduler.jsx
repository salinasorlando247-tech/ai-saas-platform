import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import api from '../../utils/api';

export default function CalendarScheduler({ userId }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get(`/schedule/upcoming/${userId}`).then(res => {
      const formatted = res.data.map(ev=>({ title: ev.caption, date: ev.scheduledTime }));
      setEvents(formatted);
    });
  }, [userId]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      height="auto"
    />
  );
}
