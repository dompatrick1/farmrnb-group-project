import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css"

import { isWithinInterval, parseISO } from "date-fns";

function ResCalendar(props) {
  const disabledRanges = []

  console.log(Object.values(props.reservations), "RESERVATIONS")

  for (const reservation of Object.values(props.reservations)) {
      disabledRanges.push([parseISO(reservation.startDate), parseISO(reservation.endDate)])
  }

  console.log(disabledRanges, "DISABLED")

  function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
  }
  
  function isWithinRanges(date, ranges) {
    return ranges.some(range => isWithinRange(date, range));
  }

  function tileDisabled({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is within any of the ranges
      return isWithinRanges(date, disabledRanges);
    }
  }

  const [date, setDate] = useState(new Date())

  return (
    <>
      <Calendar
        onChange={e => setDate(e.target.value)}
        value={date}
        tileDisabled={tileDisabled}
      />
    </>
  );
}


export default ResCalendar
