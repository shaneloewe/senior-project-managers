import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className='header'>
            <h1>commfluence</h1>
            <nav>
                <ul>
                    <li className='nav-items'>
                        <Link to="/" onClick={() => handleNavigate('/')}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-items'>
                        <Link to="/about" onClick={() => handleNavigate('/about')}>
                            About
                        </Link>
                    </li>
                    <li className='nav-items'>
                        <Link to="/contact" onClick={() => handleNavigate('/contact')}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
