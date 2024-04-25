import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getDocument, updateDocument } from '../firestoreService'; // Assuming updateDocument is available
import Header from '../components/Header.js';
import '../styles/UserPage.css';

const UserPage = () => {
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

    const handleColorChange = (newColor) => {
        // Update userData state
        setUserData({ ...userData, color: newColor });

        // Update color in Firestore
        if (auth.currentUser) {
            updateDocument('users', auth.currentUser.uid, { color: newColor });
        }
    };

    const handleNameChange = (newName) => {
        // Update userData state
        setUserData({ ...userData, name: newName });

        // Update name in Firestore
        if (auth.currentUser) {
            updateDocument('users', auth.currentUser.uid, { name: newName });
        }
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div class='logged-in'>
            <Header />
            <h1 className="user-page-title">User Page</h1>
            <p className="name-entry-box">Name: <input type="text" value={userData.name} onChange={(e) => handleNameChange(e.target.value)} /></p>
            <p className="name-entry-box">Email: {userData.email}</p>
            <p className="name-entry-box">Color: <input type="color" value={userData.color || '#ffffff'} onChange={(e) => handleColorChange(e.target.value)} /><span style={{ backgroundColor: 'white', color: userData.color }}>{userData.color}</span></p>

            {/* Display other user information here */}
        </div>
    );
};

export default UserPage;
