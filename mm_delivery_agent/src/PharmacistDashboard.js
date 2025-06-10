import React, { useState, useEffect } from 'react';

function PharmacistDashboard() {
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [drugName, setDrugName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [callData, setCallData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending call...');

    try {
      const response = await fetch(
        'https://hook.make.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Your Make.com Webhook URL here
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patient_name: patientName,
            phone_number: phoneNumber,
            drug_name: drugName,
            delivery_date: deliveryDate,
            address: address,
            notes: notes,
          }),
        }
      );

      if (response.ok) {
        setStatus('Call sent successfully!');
        setPatientName('');
        setPhoneNumber('');
        setDrugName('');
        setDeliveryDate('');
        setAddress('');
        setNotes('');
        fetchCallData(); // refresh call history
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
        'https://sheet.best/api/sheets/xxxxxxxxxxxxxxxxxxx' // Replace with your Google Sheet API URL (Sheet.best or similar)
      );
      const data = await response.json();
      setCallData(data);
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

        <label>
          Drug Name:
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
          />
        </label>

        <label>
          Delivery Date:
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label>
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        <button type="submit">Send Automated Call</button>
      </form>

      {status && <p>Status: {status}</p>}

      <h2>Call History</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Patient Name</th>
            <th>Phone Number</th>
            <th>Drug Name</th>
            <th>Delivery Date</th>
            <th>Address</th>
            <th>Call Status</th>
            <th>Home Confirmation</th>
            <th>Treatment Change</th>
            <th>Change Details</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {callData.length === 0 ? (
            <tr>
              <td colSpan="11">No call data available.</td>
            </tr>
          ) : (
            callData.map((call, index) => (
              <tr key={index}>
                <td>{call.time_stamp}</td>
                <td>{call.patient_name}</td>
                <td>{call.phone_number}</td>
                <td>{call.drug_name}</td>
                <td>{call.delivery_date}</td>
                <td>{call.address}</td>
                <td>{call.call_status}</td>
                <td>{call.home_confirmation}</td>
                <td>{call.treatment_change}</td>
                <td>{call.change_details}</td>
                <td>{call.notes}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PharmacistDashboard;
