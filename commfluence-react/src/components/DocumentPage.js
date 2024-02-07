import React, { useEffect, useState } from 'react';
import { getDocuments } from '../firestoreService'; // Import the Firestore function
import { useNavigate } from 'react-router-dom'; // If you are using react-router
import '../styles/DocumentPage.css'; // Adjust the path if necessary

const DocumentPage = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      const docs = await getDocuments('documents'); // Fetch documents from Firestore
      setDocuments(docs);
    };

    fetchDocuments();
  }, []);

  const openDocument = (docId) => {
    // Navigate to the document editor/viewer page with the docId
    navigate(`/document/${docId}`);
  };
  const handleCreateNewDocument = () => {
    navigate('/create-document'); // Assuming this is the route for CreateDocument
  };

  return (
    <div>
      <h1>Documents</h1>
      <button
        onClick={handleCreateNewDocument}
        className="create-document-button"
      >
        + Create New Document
      </button>
      <div>
        {documents.map(doc => (
          <div
            key={doc.id}
            onClick={() => openDocument(doc.id)}
            className="document-item"
          >
            {doc.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentPage;
