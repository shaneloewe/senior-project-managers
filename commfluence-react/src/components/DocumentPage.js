import React, { useEffect, useState } from 'react';
import { getDocuments } from '../firestoreService'; // Import the Firestore function
import { useNavigate } from 'react-router-dom'; 
import '../styles/DocumentPage.css'; 
import '../styles/Header.css';
import Header from '../components/Header.js';
import { useAuth } from '../AuthContext';
const DocumentPage = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Use the useAuth hook to access the current user

  useEffect(() => {
    const fetchDocuments = async () => {
      const docs = await getDocuments('documents', currentUser.uid); // Fetch documents from Firestore
      setDocuments(docs);
    };

    fetchDocuments();
  }, [currentUser]);

  const openDocument = (docId) => {
    // Navigate to the document editor/viewer page with the docId
    navigate(`/document/${docId}`);
  };
  const handleCreateNewDocument = () => {
    navigate('/create-document'); 
  };

  return (
    <div class='logged-in'>
      <Header />
      <div class="banner-container">
        <a href="/projects" class="back-button"></a>
        <h1 class='banner'>Project</h1>
        <div class="spacer"></div>
        <h1 class='taskboard'>Taskboard</h1>
      </div>
      <h1 class="page-title">Documents</h1>
      <div class="parent-container">
        <div class="grid-container">
          {documents.map(doc => (
            <div
              key={doc.id}
              onClick={() => openDocument(doc.id)}
              className="grid-item"
            >
              {doc.name}
            </div>
          ))}
          <button
            onClick={handleCreateNewDocument}
            class="create-document-button"
          >
            +
          </button>
        </div>
        <div class="task-container">
          <div class="task-card">Hi</div>
          <div class="task-card">Hoy</div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;