import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import DocumentEditor from './DocumentEditor';
import { addDocument } from '../firestoreService';
import { useAuth } from '../AuthContext';

const CreateDocument = () => {
  const { projId } = useParams();
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // For programmatically navigating
  const { currentUser } = useAuth();
  useEffect(() => {
    const createNewDocument = async () => {
      if (currentUser) {
        const docRef = await addDocument("documents", {
          content: "{}",
          projId,
          userId: currentUser.uid // Include the user ID
        });
        if (docRef) {
          console.log("New blank document created with ID:", docRef.id);
          navigate(`/project/${projId}/${docRef.id}`); // Redirect to the DocumentViewer for the new document
        }
      }
    };
  
    createNewDocument(); 
  }, [navigate]); // Add navigate to the dependency array

  const handleSave = async () => {
    const contentJSON = JSON.stringify(content); // Convert Delta object to JSON string
  };

  return (
    <div>
      <DocumentEditor onContentChange={setContent} />
      <button onClick={handleSave}>Save Document</button>
    </div>
  );
};

export default CreateDocument;
