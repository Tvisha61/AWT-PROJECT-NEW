// import { useEffect, useState } from 'react';
// import axios from 'axios';


// const ReminderPage = () => {
//   const [reminders, setReminders] = useState([]);
//   const [form, setForm] = useState({ title: '', date: '', location: '' });

//   const fetchReminders = async () => {
//     const res = await axios.get('http://localhost:5000/api/reminders');
//     setReminders(res.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('http://localhost:5000/api/reminders', form);
//     setForm({ title: '', date: '', location: '' });
//     fetchReminders();
//   };

//   useEffect(() => {
//     fetchReminders();
//   }, []);

//   return (
//     <div>
//       <h2>Add Reminder</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//         <input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
//         <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
//         <button type="submit">Add</button>
//       </form>

//       <h2>All Reminders</h2>
//       <ul>
//         {reminders.map((reminder) => (
//           <li key={reminder._id}>
//             <strong>{reminder.title}</strong> - {new Date(reminder.date).toLocaleString()} @ {reminder.location}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReminderPage;


import { useEffect, useState } from 'react';
import axios from 'axios';

const ReminderPage = () => {
  const [reminders, setReminders] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', location: '' });

  const fetchReminders = async () => {
    const res = await axios.get('http://localhost:5000/api/reminders');
    setReminders(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/reminders', form);
    setForm({ title: '', date: '', location: '' });
    fetchReminders();
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>📝 Add Reminder</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          ➕ Add Reminder
        </button>
      </form>

      <h2 style={{ textAlign: 'center', marginTop: '30px', color: '#333' }}>📋 All Reminders</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reminders.map((reminder) => (
          <li
            key={reminder._id}
            style={{
              backgroundColor: '#fff',
              padding: '10px 15px',
              borderRadius: '8px',
              marginBottom: '10px',
              borderLeft: '5px solid #007bff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <strong>{reminder.title}</strong>
            <div style={{ fontSize: '0.9em', color: '#555' }}>
              {new Date(reminder.date).toLocaleString()} @ {reminder.location}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderPage;
