import React from 'react';
import './Header.css';
import About from "./About";

const Header = () => {
    return (
        <header>
            <h1>commfluence</h1>
            <nav>
                <ul>
                    <li><a className="nav-items" href="/">Home</a></li>
                    <li><a className="nav-items" href="commfluence/src/About.js">About</a></li>
                    <li><a className="nav-items" href="/">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
