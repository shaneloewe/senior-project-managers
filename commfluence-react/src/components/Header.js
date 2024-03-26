import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { AuthContext } from '../AuthContext';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import collabIcon from '../styles/collabIcon.jpg';
import { getDocument, updateDocument } from '../firestoreService'; // Assuming updateDocument is available


const Header = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const data = await getDocument('users', auth.currentUser.uid);
                setUserData(data);
            }
        };
        fetchUserData();
    }, []);

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
            {userData && (
                <div className="profile-icon" onClick={() => handleNavigate('/account')} 
                     style={{ backgroundColor: userData.color || '#0079FF' }}>
                    {userData.email.charAt(0).toUpperCase()}
                </div>
            )}
        </div>
    );
};

export default Header;
