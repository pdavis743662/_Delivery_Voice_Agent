import React, { useState, useEffect } from 'react';

function PharmacistDashboard() {
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [callData, setCallData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending call...');

    try {
      const response = await fetch(
        'https://<your-firebase-project>.cloudfunctions.net/api/send-call',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientName,
            phoneNumber,
          }),
        }
      );

      if (response.ok) {
        setStatus('Call sent successfully!');
        setPatientName('');
        setPhoneNumber('');
        fetchCallData();
      } else {
        setStatus('Failed to send call.');
      }
    } catch (error) {
      console.error('Error sending call:', error);
      setStatus('Error sending call.');
    }
  };

  const fetchCallData = async () => {
    try {
      const response = await fetch(
        'https://<your-firebase-project>.cloudfunctions.net/api/calls'
      );
      const data = await response.json();
      setCallData(data.calls || []);
    } catch (error) {
      console.error('Error fetching call data:', error);
    }
  };

  useEffect(() => {
    fetchCallData();
  }, []);

  return (
    <div className="PharmacistDashboard" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Pharmacist Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <label>
          Patient Name:
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>

        <button type="submit">Send Automated Call</button>
      </form>

      {status && <p>Status: {status}</p>}

      <h2>Call History</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Phone Number</th>
            <th>Timestamp</th>
            <th>Collected Data</th>
          </tr>
        </thead>
        <tbody>
          {callData.length === 0 ? (
            <tr>
              <td colSpan="4">No call data available.</td>
            </tr>
          ) : (
            callData.map((call, index) => (
              <tr key={index}>
                <td>{call.patientName}</td>
                <td>{call.phoneNumber}</td>
                <td>{new Date(call.timestamp).toLocaleString()}</td>
                <td>{JSON.stringify(call.collectedData)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PharmacistDashboard;
