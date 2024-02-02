import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DocumentEditor from './DocumentEditor';
import { addDocument } from '../firestoreService'; // Adjust the path as necessary

const CreateDocument = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // For programmatically navigating

  useEffect(() => {
    const createNewDocument = async () => {
      const defaultName = "New Document"; // Default name, or prompt the user for a name
      const docRef = await addDocument("documents", { content: "{}", name: defaultName });
      // ...
    };

    createNewDocument();
  }, [navigate]);
  
  useEffect(() => {
    // Create a new blank document as soon as the component mounts
    const createNewDocument = async () => {
      const docRef = await addDocument("documents", { content: "{}" }); // Create a blank document
      if (docRef) {
        console.log("New blank document created with ID:", docRef.id);
        navigate(`/document/${docRef.id}`); // Redirect to the DocumentViewer for the new document
      }
    };

    createNewDocument();
  }, [navigate]);

  const handleSave = async () => {
    const contentJSON = JSON.stringify(content); // Convert Delta object to JSON string
    // Here, save the content to the currently opened document instead of creating a new one
  };

  return (
    <div>
      <DocumentEditor onContentChange={setContent} />
      <button onClick={handleSave}>Save Document</button>
    </div>
  );
};

export default CreateDocument;
