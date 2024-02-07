import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { getDocument, updateDocument, deleteDocument } from '../firestoreService'; // Import the necessary functions

const DocumentViewer = () => {
  const { docId } = useParams();
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState(''); // State for document name
  const quillRef = useRef();
  const quillInstance = useRef(null); // To keep reference to Quill instance
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await getDocument('documents', docId);
      if (doc) {
        setDocument(doc);
        setDocumentName(doc.name); // Set the initial document name
      }
    };

    fetchDocument();
  }, [docId]);

  useEffect(() => {
    if (document) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
      });

      const content = JSON.parse(document.content); // Parse the JSON string
      quillInstance.current.setContents(content);
    }
  }, [document]);

  const handleNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  const handleDelete = async () => {
    await deleteDocument('documents', docId);
    navigate('/documents');
  };

  const handleSave = async () => {
    const content = quillInstance.current.getContents(); // Get updated content
    const contentJSON = JSON.stringify(content); // Convert to JSON string

    await updateDocument('documents', docId, { name: documentName, content: contentJSON });
    console.log("Document updated");
    // Additional handling after saving the document
  };

  return (
    <div>
      <h1>Document Editor</h1>
      <input
        type="text"
        value={documentName}
        onChange={handleNameChange}
        placeholder="Document Name"
        style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
      />
      <div ref={quillRef} />
      <button onClick={handleSave}>Save Document</button>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>\
      Delete Document
      </button>
    </div>
  );
};

export default DocumentViewer;
