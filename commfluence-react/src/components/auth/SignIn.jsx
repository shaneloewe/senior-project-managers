import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Assuming you're using Firebase for authentication
import './SignIn.css'; // Import the CSS file for styling


const SignIn = ({ auth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); //new 
    const history = useHistory(); // Initialize useHistory hook

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Handle successful sign-in
                console.log(userCredential);
                history.push('/projects'); // sends user to projects page
            })
            .catch((error) => {
                // Handle sign-in errors
                console.log(error);
                setError('Invalid email or password. Please try again.'); //new 
            });
    };

    return (
        <div className='sign-in-container'>
            <form className='sign-in-form' onSubmit={signIn}>
                <h1>Log In</h1>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Sign In</button>
            </form>
            {error && <div className='auth-error-message'>{error}</div> } {''}
        </div>
        
    );
};

export default SignIn;

