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
        <button onClick={onClose} className="close-popup">←</button>
        <div className="popup-title">Collaborators</div>
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} className="user-circle">{user.charAt(0).toUpperCase()}</li>
          ))}
        </ul>

        <div className="email-input-container">
          <input
            className="email-input" // Added class for styling
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
          />
        </div>

        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserListPopup;
