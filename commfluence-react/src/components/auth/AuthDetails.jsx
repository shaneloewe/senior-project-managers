import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase';  
import './AuthDetails.css';

const AuthDetails = () => {
    const { currentUser } = useContext(AuthContext);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign out was Successful');
        }).catch(error => console.log(error));
    };

    return (
        <div className="auth-details-container">
            <div className="auth-details-content">
                {currentUser ? (
                    <>
                        <p className="auth-details-message">{`Signed In as ${currentUser.email}`}</p>
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
