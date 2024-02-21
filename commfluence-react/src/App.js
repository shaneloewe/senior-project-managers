import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/Header.css";
import Home from "./components/HomeContent";
import CreateDocument from './components/CreateDocument';
import DocumentViewer from './components/DocumentViewer';
import Projects from "./pages/Projects";
import CreateProject from "./components/CreateProject";
import ProjectViewer from "./components/ProjectViewer";

const App = () => (
  <AuthProvider> { }
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:projId/create-document" element={<CreateDocument />} />
        <Route path="/project/:projId/:docId" element={<DocumentViewer />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:projId" element={<ProjectViewer />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
