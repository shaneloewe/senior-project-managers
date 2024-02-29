import React from 'react';
import Authentication from '../components/auth/Authentication';
import AuthDetails from '../components/auth/AuthDetails';
import Header from '../components/Header.js';
import '../styles/Header.css'
import { useState } from 'react';

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle login
    const handleLogin = () => {
        // Perform login logic, then set isLoggedIn to true
        setIsLoggedIn(true);
    };

    return (
        <div className="home-page">
            <Header />
            {!isLoggedIn && <Authentication onLogin={handleLogin} />}
            {isLoggedIn && <AuthDetails />}
        </div>
    );
}

export default Home;