import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from './pages/Projects';
import "./styles/Header.css";
import Header from "./components/Header";
import Home from "./components/HomeContent";
import CreateDocument from './components/CreateDocument';
import DocumentPage from './components/DocumentPage';
import DocumentViewer from './components/DocumentViewer';



const App = () => (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-document" element={<CreateDocument />} />
        <Route path="/documents" element={<DocumentPage />} />
        <Route path="/document/:docId" element={<DocumentViewer />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  </div>
);

export default App;
