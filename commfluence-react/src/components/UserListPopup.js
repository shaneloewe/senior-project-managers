import React, { useState } from 'react';

const UserListPopup = ({ users, onAddUser, onClose }) => {
  const [email, setEmail] = useState('');

  const handleAddUser = () => {
    onAddUser(email);
    setEmail('');
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button onClick={onClose} className="close-popup">X</button>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li> 
          ))}
        </ul>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user email"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserListPopup;
