import { useState, useEffect } from 'react';
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`/api/appointments/${id}`, { interview });
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
    })
    .catch((err) => {
      throw new Error(err.message)
    })
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios.get(`/api/days`)),
        Promise.resolve(
          axios.get(`/api/appointments`)),
          Promise.resolve(axios.get(`/api/interviewers`))
        ])
        .then(all => {
          setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        })
        .catch(err => console.log(err));
      }, []);
      
      return { state, setDay, bookInterview, deleteInterview }
};

export default useApplicationData;
