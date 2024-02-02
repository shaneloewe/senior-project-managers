import React, { useState } from 'react';
import DocumentEditor from './DocumentEditor';
import { addDocument } from '../firestoreService'; // Adjust the path as necessary

const CreateDocument = () => {
  const [content, setContent] = useState('');


  
  const handleSave = async () => {
    const contentJSON = JSON.stringify(content); // Convert Delta object to JSON string
    const docRef = await addDocument("documents", { content: contentJSON });
    if (docRef) {
      console.log("Document created with ID:", docRef.id);
      // Additional handling after saving the document
    }
  };
  

  return (
    <div>
      <DocumentEditor onContentChange={setContent} />
      <button onClick={handleSave}>Save Document</button>
    </div>
  );
};

export default CreateDocument;
