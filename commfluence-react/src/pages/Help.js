import React from "react";
import '../styles/App.css';
import '../styles/LandingPage.css';
import '../styles/Header.css';
import Header from '../components/Header.js';


function Help() {
    return (
        <div className="home-page">
            <Header />
            <h2>FAQ</h2>
            <p className="Help-text">Questions?</p>
            
        </div>
    );
}

export default Help;
