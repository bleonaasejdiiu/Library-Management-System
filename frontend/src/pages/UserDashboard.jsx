import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userId'); // duhet me qenë id e logged-in user

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së njoftimeve:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
      fetchNotifications(); // rifreskon listën
    } catch (err) {
      console.error("Gabim gjatë shënimit si e lexuar:", err);
    }
  };

  return (
    <div>
      <h2>Njoftimet e tua</h2>
      {notifications.length === 0 ? <p>Nuk ka njoftime</p> : (
        <ul>
          {notifications.map(n => (
            <li key={n.id}>
              {n.message} 
              <button onClick={() => markAsRead(n.id)}>Mark as read</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserNotifications;
