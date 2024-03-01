import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { AuthContext } from '../AuthContext';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign out was Successful');
        }).catch(error => console.log(error));
        navigate('/');
    };

    return (
        <div className='header'>
            <h1>commfluence</h1>
            <nav>
                <ul>
                    {currentUser ? (
                        <li className='nav-items'>
                            <Link to="/projects" onClick={() => handleNavigate('/projects')}>
                                Home
                            </Link>
                        </li>
                    ) : (
                        <li className='nav-items'>
                            <Link to="/" onClick={() => handleNavigate('/')}>
                                Home
                            </Link>
                        </li>
                    )}
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
                    {currentUser ? (
                        <li className='logout-navitem'>
                            <Link to="/" onClick={userSignOut}>
                                Sign Out
                            </Link>
                        </li>
                    ) : (
                        <li className='nav-items'>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Header;
