import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import config from './config'

function Home() {
  const [name, setName] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [pnr, setPnr] = useState('');
  const [flightStatus, setFlightStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFlightStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/api/flights/${flightNumber}`);
      setFlightStatus(response.data);
    } catch (error) {
      console.error('Error fetching flight status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Flight Status</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchFlightStatus();
      }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Passenger Name(Full Name)"
          required
        />
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          placeholder="Flight Number"
          required
        />
        <input
          type="text"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          placeholder="PNR/Booking Number"
          required
        />
        <button type="submit">Check Status</button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        flightStatus && (
          <div className="flight-status">
            <h2>Flight Status</h2>
            <p>Status: {flightStatus.status}</p>
            <p>Gate: {flightStatus.gate}</p>
            <p>Departure Time: {new Date(flightStatus.ActualDepartureTime || flightStatus.ScheduledDepartureTime).toLocaleString()}</p>
            <p>Arrival Time: {new Date(flightStatus.ActualArrivalTime || flightStatus.ScheduledArrivalTime).toLocaleString()}</p>
          </div>
        )
      )}
    </div>
  );
}

export default Home;
