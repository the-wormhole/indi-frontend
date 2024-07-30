import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import config from './config'

function Dashboard() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/auth/future-flights`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Future Flights</h1>
      <table className="flights-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Gate</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{flight.gate}</td>
              <td>
                {flight.ActualDepartureTime
                  ? new Date(flight.ActualDepartureTime).toLocaleString()
                  : new Date(flight.ScheduledDepartureTime).toLocaleString()}
              </td>
              <td>
                {flight.ActualArrivalTime
                  ? new Date(flight.ActualArrivalTime).toLocaleString()
                  : new Date(flight.ScheduledArrivalTime).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;