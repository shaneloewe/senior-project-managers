import React from "react";
import '../styles/App.css';
import '../styles/LandingPage.css';
import '../styles/Header.css';
import Header from '../components/Header.js';


function Contact() {
    return (
        <div className="home-page">
            <Header />
            <h2>We value your<br></br>feedback</h2>
            <p className="contact-text">Reach out to us over email at<br></br>commfluence.team@gmail.com</p>
        </div>
    );
}

export default Contact;
