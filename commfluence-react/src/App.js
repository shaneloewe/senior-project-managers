import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/Header.css";
import Header from "./components/Header";
import Home from "./components/HomeContent";
import CreateDocument from './components/CreateDocument';
import DocumentPage from './components/DocumentPage';
import DocumentViewer from './components/DocumentViewer';

const App = () => (
  <AuthProvider> {}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-document" element={<CreateDocument />} />
        <Route path="/documents" element={<DocumentPage />} />
        <Route path="/document/:docId" element={<DocumentViewer />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
