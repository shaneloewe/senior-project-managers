import React from "react";
import '../styles/App.css';
import '../styles/LandingPage.css';
import '../styles/Header.css';
import Header from '../components/Header.js';

function Help() {
    return (
        <div className="home-page">
            <Header />
            <h2>Frequently asked Questions</h2>
            <p className="Help-text">Welcome to the Help page for Commfluence!</p>
            <h3>Creating an Account:</h3>
            <p>To create an account:</p>
            <ol>
                <li>Click the "Sign In" button on the first page of the software.</li>
                <li>Enter your email and password to create your account.</li>
            </ol>
            <h3>Managing Projects:</h3>
            <p>To manage projects:</p>
            <ul>
                <li>Create a new project by clicking the '+' button on the Projects page and enter a project name.</li>
                <li>Invite collaborators by clicking on the "Invite" button on the top right of the project screen and entering their email.</li>
                <li>Assign tasks to collaborators with a due date and progress level.</li>
            </ul>
            <h3>Creating Documents:</h3>
            <p>To create a document within a project:</p>
            <ul>
                <li>Click on the "Create Document" button within the project.</li>
                <li>In the document editor, use the text editor toolbar for basic text editing and formatting.</li>
                <li>Select the desired format such as MLA or APA.</li>
                <li>Click "Save and Exit" on the top left to save your progress.</li>
            </ul>
            <h3>Contact Us:</h3>
            <p>If you encounter any issues or have further questions, please don't hesitate to contact our support team:</p>
            <ul>
                <li>Email: support@commfluence.com</li>
            </ul>
            <p className="Help-text">We're here to help you make the most out of Commfluence!</p>
        </div>
    );
}

export default Help;
