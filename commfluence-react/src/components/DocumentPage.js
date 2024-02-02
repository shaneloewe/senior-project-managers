import React, { useEffect, useState } from 'react';
import { getDocuments } from '../firestoreService'; // Import the Firestore function
import { useNavigate } from 'react-router-dom'; // If you are using react-router

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

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {documents.map(doc => (
          <li key={doc.id} onClick={() => openDocument(doc.id)}>
            Document {doc.id} {/* Display other document details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentPage;
