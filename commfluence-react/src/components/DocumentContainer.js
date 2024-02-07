import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentEditor from './DocumentEditor';
import { getDocument, updateDocument } from '../firestoreService';

const DocumentContainer = () => {
  const { docId } = useParams();
  const [documentName, setDocumentName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      const docData = await getDocument('documents', docId);
      if (docData) {
        setDocumentName(docData.name || 'Untitled');
        setContent(docData.content || '');
      }
    };

    fetchDocument();
  }, [docId]);

  const handleNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  const handleSave = async () => {
    const updatedData = { content: JSON.stringify(content), name: documentName };
    await updateDocument('documents', docId, updatedData);
    // Additional handling (e.g., confirmation message)
  };

  return (
    <div>
      <input
        type="text"
        value={documentName}
        onChange={handleNameChange}
        placeholder="Enter Document Name"
        style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
      />
      <DocumentEditor onContentChange={setContent} initialContent={content} />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default DocumentContainer;
