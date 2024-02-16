import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DocumentEditor from './DocumentEditor';
import { addDocument } from '../firestoreService'; 
import { useAuth } from '../AuthContext'; 

const CreateDocument = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // For programmatically navigating
  const { currentUser } = useAuth(); 

  useEffect(() => {
    const createNewDocument = async () => {
      if (currentUser) {
        const docRef = await addDocument("documents", {
          content: "{}",
          userId: currentUser.uid // Include the user ID
        });
        if (docRef) {
          navigate(`/document/${docRef.id}`);
        }
      }
    };
  
    createNewDocument();
  }, [navigate, currentUser]);
  

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
