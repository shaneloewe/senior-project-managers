import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import './AuthDetails.css'; // Import the CSS file

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            unsubscribe(); // Cleanup function to unsubscribe from the listener
        };
    }, []);

    const userSignOut = () => {
        signOut(auth).then(()=> {
            console.log('Sign out was Successful')
        }).catch(error => console.log(error))
    };

    return (
        <div className="auth-details-container">
            <div className="auth-details-content">
                {authUser ? (
                    <>
                        <p className="auth-details-message">{`Signed In as ${authUser.email}`}</p>
                        <button className="auth-details-button" onClick={userSignOut}>Sign Out</button>
                    </>
                ) : (
                    <p className="auth-details-message">Not Signed In</p>
                )}
            </div>
        </div>
    );
};

export default AuthDetails;



