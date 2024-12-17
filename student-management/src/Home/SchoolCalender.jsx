import React from "react";
import { useContext } from "react";
import { Context } from "../Context";

const SchoolCalendar = () => {
  const { getEventApiData, setIsEventAdd, setDeleteEvent } =
    useContext(Context);

  return (
    <div className="school-calendar">
      <div className="top">
        <h2>School Events</h2>
        <button onClick={() => setIsEventAdd(true)}>Add Event</button>
      </div>
      <ol>
        {getEventApiData.map((event, index) => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toISOString().split("T")[0];

          return (
            <div className="event_flex">
              <li key={index}>
                {event.name} - {formattedDate}
              </li>
              <button
                onClick={() => setDeleteEvent({ delete: true, data: event })}
              >
                Delete
              </button>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

export default SchoolCalendar;
