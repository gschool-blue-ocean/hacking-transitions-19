import React, { useState, useEffect, useContext, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./NewCalendar.css";
import AppointmentContext from "../../context/AppointmentContext.jsx";
import CohortContext from "../../context/CohortContext.jsx";
import { Tooltip } from 'react-tooltip';

const NewCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { events } = useContext(AppointmentContext);
  const { students } = useContext(CohortContext);

  console.log(events);

  const handleViewChange = (view) => {
    console.log("Selected view: " + view);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    console.log("Selected event: " + selectedEvent);
  };

  const getEventOwner = (givenStudentId) => {
    const eventOwner = students.find((student) =>
    student.id === givenStudentId);
    const eventOwnerFirstName = eventOwner ? eventOwner.firstname : null;
    const eventOwnerLastName = eventOwner ? eventOwner.lastname : null;
    return eventOwnerFirstName + " " + eventOwnerLastName;
  }

  useEffect(() => {
    const formattedEvents = events.map((event) => ({
      start: new Date(event.startdate),
      end: new Date(event.enddate),
      title: event.title + ": " + getEventOwner(event.student_id),
      allDay: event.allday,
      extendedProps: {
        'data-tip': event.title + ": " + getEventOwner(event.student_id)
      }
    }));
    setCalendarEvents(formattedEvents);
  }, []);

  const headerToolbar = {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={handleEventClick}
        headerToolbar={headerToolbar}
        views={{
          week: {
            type: "timeGridWeek",
            duration: { weeks: 1 },
          },
          day: {
            type: "timeGridDay",
            duration: { days: 1 },
          },
        }}
        onView={() => handleViewChange}
      />
      <Tooltip effect="solid" />
    </div>
  );
};

export default NewCalendar;
