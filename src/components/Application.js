import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayList from"components/DayList";
import Appointment from "components/Appointment"
import "components/Application.scss";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Felix Share",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Charles Prett",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState(["Monday"]);

  useEffect(() => {
    axios.get(`/api/days`)
      .then(result => {
        console.log(result.data);
        setDays(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  
  return (

    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointments.map(appObj => <Appointment key={appObj.id} {...appObj} />) }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

