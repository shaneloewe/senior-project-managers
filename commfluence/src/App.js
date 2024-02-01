import './App.css';
import React from "react";
import Header from "./Header";
import './LandingPage.css';
//import SignIn from './components/auth/SignIn';
//import SignUp from './components/auth/SignUp';
import Authentication from './components/auth/Authentication';
import AuthDetails from './components/auth/AuthDetails';


function App() {
  return (

    <div className="App">
      <Header />
      <Authentication />
      <AuthDetails/>
      <h2>Let's get<br></br>started</h2>
      
    </div>
  );
}

export default App;
