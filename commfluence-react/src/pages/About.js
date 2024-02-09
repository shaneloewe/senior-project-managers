import React from "react";
import '../styles/App.css';
import '../styles/LandingPage.css';
import '../styles/Header.css';
import Header from '../components/Header.js';


function About() {
    return (
        <div className="home-page">
            <Header />
            <h2>Free.<br></br>Collaborative.<br></br>Organized.</h2>
            <p className="about-text">Commfluence is an online collaborative rich-text document editor with a built-in project and task management system. Perfect for projects with large teams and multiple documents. Commfluence is a web application that is a documentation solution, a project management solution, and a task manager; all in one. It's even fitted with academic templates for MLA, APA, and Chicago style papers, so Commfluence is a great tool for students and professionals alike.<br></br><br></br>Commfluence is currently being developed by four senior Software Engineering / Computer Information Systems students at the University of Northern Colorado.</p>
        </div>
    );
}

export default About;
