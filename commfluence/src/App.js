import './App.css';
import React from "react";
import Header from "./Header";
import './LandingPage.css';
//import SignIn from './components/auth/SignIn';
//import SignUp from './components/auth/SignUp';
import Authentication from '../../commfluence-react/src/components/auth/Authentication';
import AuthDetails from '../../commfluence-react/src/components/auth/AuthDetails';


function App() {
  return (

    <div className="App">
      <Header />
      <Authentication />
      <AuthDetails/>
      <h2><br></br></h2>
      
    </div>
  );
}

export default App;
