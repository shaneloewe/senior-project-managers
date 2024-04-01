import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getDocument, updateDocument } from '../firestoreService'; // Assuming updateDocument is available
import Header from '../components/Header.js';

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
        setUserData({...userData, color: newColor});

        // Update color in Firestore
        if (auth.currentUser) {
            updateDocument('users', auth.currentUser.uid, { color: newColor });
        }
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <h1>User Page</h1>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Color: <span style={{ backgroundColor: userData.color, color: 'white' }}>{userData.color}</span></p>
            <input type="color" value={userData.color || '#ffffff'} onChange={(e) => handleColorChange(e.target.value)} />
            {/* Display other user information here */}
        </div>
    );
};

export default UserPage;
