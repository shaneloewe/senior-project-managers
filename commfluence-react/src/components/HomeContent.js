import React from 'react';
import Authentication from '../components/auth/Authentication';
import AuthDetails from '../components/auth/AuthDetails';
import Header from '../components/Header.js';
import '../styles/Header.css'

const Home = () => {
    return (

        <div className="home-page">
            <Header />
            <h2>Let's get<br></br>started</h2>
            <Authentication />
            <AuthDetails />
        </div>
    );
}

export default Home;