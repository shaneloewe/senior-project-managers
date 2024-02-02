import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/Header.css";
import Header from "./components/Header";
import Home from "./components/HomeContent";
import Authentication from '../../commfluence-react/src/components/auth/Authentication';
import AuthDetails from '../../commfluence-react/src/components/auth/AuthDetails';

const App = () => (
  <div>
    <Router>
      <Header />
      <Authentication />
      <AuthDetails/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  </div>
);

export default App;
