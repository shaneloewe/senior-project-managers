import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { getDocument, updateDocument, deleteDocument } from '../firestoreService'; // Import the necessary functions
import '../styles/DocumentViewer.css';


const DocumentViewer = () => {
  const { projId, docId } = useParams();
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
  }, []);

  useEffect(() => {
    if (document) {
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
  
        [{ 'header': 1 }, { 'header': 2 }], // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
        [{ 'direction': 'rtl' }], // text direction
  
        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults
        [{ 'font': [] }],
        [{ 'align': [] }],
  
        ['clean'] // remove formatting button
      ];
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        }
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
    navigate(`/project/${projId}`);
  };

  const handleSave = async () => {
    const content = quillInstance.current.getContents(); // Get updated content
    const contentJSON = JSON.stringify(content); // Convert to JSON string

    await updateDocument('documents', docId, { name: documentName, content: contentJSON });
    console.log("Document updated");
    // Additional handling after saving the document

  };

  const saveAndExit = async () => {
    const content = quillInstance.current.getContents(); // Get updated content
    const contentJSON = JSON.stringify(content); // Convert to JSON string

    await updateDocument('documents', docId, { name: documentName, content: contentJSON });
    console.log("Document updated");
    // Additional handling after saving the document
    navigate(`/project/${projId}`);
  };

  return (
    <div>
      <input
        type="text"
        value={documentName}
        onChange={handleNameChange}
        placeholder="Document Name"
        style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
      />
      <div class="button-container">
        <button onClick={saveAndExit}>Save and Exit</button>
        <button onClick={handleSave}>Save Document</button>
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
          Delete Document
        </button>
      </div>
      <div class="quill-container">
        <div ref={quillRef} />
      </div>

    </div>
  );
};

export default DocumentViewer;
