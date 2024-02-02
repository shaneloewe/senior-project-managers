import React from 'react';
import Authentication from '../components/auth/Authentication';
import AuthDetails from '../components/auth/AuthDetails';

const Home = () => {
    return (

        <div className="App">
            <h2>Let's get<br></br>started</h2>
            <Authentication />
            <AuthDetails />
        </div>
    );
}

export default Home;