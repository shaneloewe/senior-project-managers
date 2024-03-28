import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { auth } from '../firebase';
import { getDocument, updateDocument } from '../firestoreService'; // Assuming updateDocument is available
import '../styles/UserListPopup.css'; // Import the CSS file for styling
const UserListPopup = ({ users, onAddUser, onClose }) => {
  const [email, setEmail] = useState('');

  const handleAddUser = () => {
    onAddUser(email);
    setEmail('');
  };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const fetchUserData = async () => {
          if (auth.currentUser) {
              const data = await getDocument('users', auth.currentUser.uid);
              setUserData(data);
          }
      };
      fetchUserData();
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button onClick={onClose} className="close-popup">←</button>
        <div className="popup-title">Collaborators</div>
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} className="user-circle"
                style={{ backgroundColor: user.color || '#0079FF' }}>
              {user.email.charAt(0).toUpperCase()}
              <span className="tooltip">{user.email}</span> {/* Tooltip */}
            </li>
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
