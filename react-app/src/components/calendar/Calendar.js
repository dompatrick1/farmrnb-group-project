import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css"

function ResCalendar(props) {
  const [value, setValue] = useState(new Date())
  console.log(props.reservations, "-------- props.reservation")
  console.log(props, "-------- props")


  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </>
  );
}


export default ResCalendar
