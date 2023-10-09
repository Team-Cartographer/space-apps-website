"use client";

import { useState, useEffect } from "react";

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");

  return `${year}-${month}-${day}-${hour}`;
}

const Date = () => {
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  const [data, setData] = useState(false);

  useEffect(() => {
    fetch("./kp.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    const yearSet = new Set();

    Object.keys(data).forEach((date) => {
      const [a_year, a_month, a_day, a_hour] = date.split("-");
      yearSet.add(a_year);
    });

    setAvailableYears([...yearSet]);
  }, [data]);

  useEffect(() => {
    const monthsSet = new Set();

    Object.keys(data).forEach((date) => {
      const [a_year, a_month, a_day, a_hour] = date.split("-");
      if (a_year != year) return;

      monthsSet.add(a_month);
    });

    setAvailableMonths([...monthsSet]);
  }, [year]);

  useEffect(() => {
    const daySet = new Set();

    Object.keys(data).forEach((date) => {
      const [a_year, a_month, a_day, a_hour] = date.split("-");
      if (a_year != year || a_month != month) return;

      daySet.add(a_day);
    });

    setAvailableDays([...daySet]);
  }, [month]);

  useEffect(() => {
    const hourSet = new Set();

    Object.keys(data).forEach((date) => {
      const [a_year, a_month, a_day, a_hour] = date.split("-");
      if (a_year != year || a_month != month || a_day != day) return;

      hourSet.add(a_hour);
    });

    setAvailableHours([...hourSet]);
  }, [day]);

  return (
    <div>
      {year == null && (
        <>
          <h1>Choose year</h1>
          {availableYears.map((year) => (
            <>
              <button onClick={() => setYear(year)}>{year}</button>
              <br />
            </>
          ))}
        </>
      )}

      {year != null && month == null && (
        <>
          <h1>Choose month</h1>
          {availableMonths.map((month) => (
            <>
              <button onClick={() => setMonth(month)}>{month}</button>
              <br />
            </>
          ))}
        </>
      )}

      {year != null && month != null && day == null && (
        <>
          <h1>Choose day</h1>
          {availableDays.map((day) => (
            <>
              <button onClick={() => setDay(day)}>{day}</button>
              <br />
            </>
          ))}
        </>
      )}

      {year != null && month != null && day != null && (
        <>
          <h1>Choose hour</h1>
          {availableHours.map((hour) => (
            <>
              <button
                onClick={() => {
                  const date = new window.Date(year, month, day, hour * 3);

                  const timestamp = formatDate(date);
                  window.location.href = `/?timestamp=${timestamp}`;
                }}
              >
                {hour * 3}
              </button>
              <br />
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default Date;
