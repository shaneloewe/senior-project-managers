import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { getDocument, updateDocument } from '../firestoreService'; // Import the necessary functions

const DocumentViewer = () => {
  const { docId } = useParams();
  const [document, setDocument] = useState(null);
  const quillRef = useRef();
  const quillInstance = useRef(null); // To keep reference to Quill instance

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await getDocument('documents', docId);
      setDocument(doc);
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

  const handleSave = async () => {
    const content = quillInstance.current.getContents(); // Get updated content
    const contentJSON = JSON.stringify(content); // Convert to JSON string

    await updateDocument('documents', docId, { content: contentJSON });
    console.log("Document updated");
    // Additional handling after saving the document
  };

  return (
    <div>
      <h1>Document Editor</h1>
      <div ref={quillRef} />
      <button onClick={handleSave}>Save Document</button>
    </div>
  );
};

export default DocumentViewer;
