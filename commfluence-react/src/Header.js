import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import './Header.css';
import About from "./pages/About";
import App from "./App";

const Header = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    )
}



export default Header;
