import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Assuming you're using Firebase for authentication

const SignUp = ({ auth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Handle successful sign-up
                console.log(userCredential);
            })
            .catch((error) => {
                // Handle sign-up errors
                console.log(error);
            });
    };

    return (
        <div className='sign-up-container'>
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
                <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
