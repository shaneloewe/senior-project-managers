import React from "react";
import '../styles/App.css';
import '../styles/LandingPage.css';
import '../styles/Header.css';
import '../styles/Help.css';
import Header from '../components/Header.js';

function Help() {
    return (
        <div className="home-page">
            <Header />
            <h2>Frequently asked Questions</h2>
            <p className="Help-text">Welcome to the Help page for Commfluence!</p>
            <h3 className="help-text">Creating an Account:</h3>
            <p className="help-text">To create an account:</p>
            <ol>
                <li className="help-text-2">Click the "Sign In" button on the first page of the software.</li>
                <li className="help-text-2">Enter your email and password to create your account.</li>
            </ol>
            <h3 className="about-text">Managing Projects:</h3>
            <p className="about-text">To manage projects:</p>
            <ul>
                <li className="help-text-2">Create a new project by clicking the '+' button on the Projects page and enter a project name.</li>
                <li className="help-text-2">Invite collaborators by clicking on the "Invite" button on the top right of the project screen and entering their email.</li>
                <li className="help-text-2">Assign tasks to collaborators with a due date and progress level.</li>
            </ul>
            <h3 className="about-text">Creating Documents:</h3>
            <p className="about-text">To create a document within a project:</p>
            <ul>
                <li className="help-text-2">Click on the "Create Document" button within the project.</li>
                <li className="help-text-2">In the document editor, use the text editor toolbar for basic text editing and formatting.</li>
                <li className="help-text-2">Select the desired format such as MLA or APA.</li>
                <li className="help-text-2">Click "Save and Exit" on the top left to save your progress.</li>
            </ul>
            <h3 className="about-text">Contact Us:</h3>
            <p className="about-text">If you encounter any issues or have further questions, please don't hesitate to contact our support team at support@commfluence.com</p>
            <p className="Help-text">We're here to help you make the most out of Commfluence!</p>
        </div>
    );
}

export default Help;
