import React, { useState } from 'react';

function PharmacistDashboard() {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [drugName, setDrugName] = useState('');
  const [drugDIN, setDrugDIN] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [scheduledDeliveryDate, setScheduledDeliveryDate] = useState('');
  const [deliveryTimeFrame, setDeliveryTimeFrame] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending call...');

    try {
      const response = await fetch(
        'https://hook.us2.make.com/whnf2g6rovuuw1f4tkt3uhn4q17jutdq', // Your Make.com Webhook URL here
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patient_id: patientId,
            patient_name: patientName,
            phone_number: phoneNumber,
            drug_name: drugName,
            drug_DIN: drugDIN,
            patient_address: patientAddress,
            scheduled_delivery_date: scheduledDeliveryDate,
            delivery_time_frame: deliveryTimeFrame,
            notes: notes,
          }),
        }
      );

      if (response.ok) {
        setStatus('Call sent successfully!');
        setPatientId('');
        setPatientName('');
        setPhoneNumber('');
        setDrugName('');
        setDrugDIN('');
        setPatientAddress('');
        setScheduledDeliveryDate('');
        setDeliveryTimeFrame('');
        setNotes('');
      } else {
        setStatus('Failed to send call.');
      }
    } catch (error) {
      console.error('Error sending call:', error);
      setStatus('Error sending call.');
    }
  };

  return (
    <div className="PharmacistDashboard" style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>
      <h1>Pharmacist Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <label>
          Patient ID:
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </label>

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
          Drug DIN:
          <input
            type="text"
            value={drugDIN}
            onChange={(e) => setDrugDIN(e.target.value)}
            required
          />
        </label>

        <label>
          Patient Address:
          <input
            type="text"
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
            required
          />
        </label>

        <label>
          Scheduled Delivery Date:
          <input
            type="date"
            value={scheduledDeliveryDate}
            onChange={(e) => setScheduledDeliveryDate(e.target.value)}
            required
          />
        </label>

        <label>
          Delivery Time Frame:
          <input
            type="text"
            value={deliveryTimeFrame}
            onChange={(e) => setDeliveryTimeFrame(e.target.value)}
            placeholder="e.g. 9AM - 12PM"
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

      {/* ✅ IFRAME EMBED OF GOOGLE SHEET */}
      <h2>Call History</h2>
      <div style={{ width: '100%', minHeight: '700px', overflow: 'hidden', border: '1px solid #ccc', borderRadius: '8px' }}>
      <iframe 
      title="Call Data Sheet"
      src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQa0G6LQhWxlLvNF-YafnDn--uNIrJdJWPqoz7CaeAHj_4CScgA_8-TPR5fYkMHOuSN3dm8XDgVWhgs/pubhtml?widget=true&amp;headers=false" 
      width="100%"
      height="1000"
      style={{ border: 'none' }}>
      </iframe>
      </div>
    </div>
  );
}

export default PharmacistDashboard;
