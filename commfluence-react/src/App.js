import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/Header.css";
import Header from "./components/Header";
import Home from "./components/HomeContent";

const App = () => (
  <div>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  </div>
);

export default App;
