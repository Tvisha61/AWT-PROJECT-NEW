import { useState } from 'react';

const SmartReminder = () => {
  const [reminderTime, setReminderTime] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [noteId] = useState(''); // Remove or replace with actual ID logic

  const handleCreateReminder = async () => {
    const response = await fetch('http://localhost:5000/api/reminders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteId, reminderTime, location, message }),
    });
    const data = await response.json();
    console.log('Reminder created:', data);
  };

  return (
    <div>
      <h2>Create a Smart Reminder</h2>
      <input
        type="datetime-local"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Reminder message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleCreateReminder}>Create Reminder</button>
    </div>
  );
};

export default SmartReminder;
