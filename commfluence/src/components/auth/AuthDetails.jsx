import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';

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
        <div>
            {authUser ? (
                <>
                    <p>{`Signed In as ${authUser.email}`}</p>
                    <button onClick={userSignOut}>Sign Out</button>
                </>
            ) : (
                <p>Not Signed In</p>
            )}
        </div>
    );
};

export default AuthDetails;
