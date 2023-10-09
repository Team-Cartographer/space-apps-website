"use client";

import { useState } from "react";

const YEAR_RANGE = [2017, 2018, 2019, 20220, 2021, 2022];

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");

  return `${year}-${month}-${day}-${hour}`;
}

const Date = () => {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  return (
    <div>
      {year == null && (
        <>
          <h1>Choose year</h1>
          {YEAR_RANGE.map((year) => (
            <button onClick={() => setYear(year)}>{year}</button>
          ))}
        </>
      )}

      {year != null && month == null && (
        <>
          <h1>Choose month</h1>
          {[...Array(12).keys()].map((month) => (
            <button onClick={() => setMonth(month)}>{month + 1}</button>
          ))}
        </>
      )}

      {year != null && month != null && day == null && (
        <>
          <h1>Choose day</h1>
          {[...Array(31).keys()].map((day) => (
            <button onClick={() => setDay(day)}>{day + 1}</button>
          ))}
        </>
      )}

      {year != null && month != null && day != null && (
        <>
          <h1>Choose hour</h1>
          {[...Array(8).keys()].map((hour) => (
            <button
              onClick={() => {
                const date = new window.Date(year, month, day, hour * 3);

                const timestamp = formatDate(date);
                window.location.href = `/?timestamp=${timestamp}`;
              }}
            >
              {hour * 3}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default Date;
