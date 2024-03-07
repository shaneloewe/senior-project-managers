import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Authentication.css'; // Import the CSS file for styling
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../firestoreService.js';



const Authentication = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleAuthAction = (e) => {
        e.preventDefault();
        if (isLogin) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('Logged in uid:', userCredential.user.uid);
                    console.log('Email', userCredential.user.email);
                    navigate('/projects');
                })
                .catch((error) => {
                    console.log('Login Error:', error);
                });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('Account Created:', userCredential.user);
                    const userData = {
                        uid: userCredential.user.uid,
                        email: userCredential.user.email,
                    }
                    addUser('users', userData)
                        .then(docRef => {
                            console.log('User added to Firestore with ID:', docRef.id);
                            navigate('/projects');
                        })
                        .catch(error => {
                            console.error('Error adding user to Firestore:', error);
                        });

                    console.log('Account Created:', userCredential.user);
                })
                .catch((error) => {
                    console.log('Account Creation Error:', error);
                });
        }
    };

    return (
        <div className='authentication-container'>
            <div className='authentication-box'>
                <h2>{isLogin ? 'Lets Get Writing' : 'Create Account'}</h2>
                <form onSubmit={handleAuthAction}>
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
                    <button type='submit'>{isLogin ? 'Sign In' : 'Create Account'}</button>
                </form>
                <div className='toggle-link' onClick={handleToggle}>
                    {isLogin ? 'Create an account' : 'Back to login'}
                </div>
            </div>
        </div>
    );
};

export default Authentication;
