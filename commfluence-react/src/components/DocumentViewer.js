import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { getDocument, updateDocument, deleteDocument } from '../firestoreService';
import '../styles/DocumentViewer.css';

const DocumentViewer = () => {
  const { projId, docId } = useParams();
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Default'); // State for selected template
  const quillRef = useRef();
  const quillInstance = useRef(null);
  const navigate = useNavigate();

  // Define text data for each template
  // Define text data for each template
// Define text data for each template
const templateTextData = {
  Default: 'Title: [Your title here]',
  MLA: `Title: [Your title here]

Introduction:
Climate change profoundly alters ecosystems, jeopardizing biodiversity worldwide. Understanding its ramifications is essential for devising effective conservation measures.

Body Paragraphs:

Temperature Rise: Increasing global temperatures disrupt ecosystems. For instance, warmer waters lead to coral bleaching, endangering marine biodiversity ([Author], [Year]).

Ice Cap Melting: The melting of ice caps threatens polar habitats. Polar bears, reliant on sea ice for hunting, face dwindling food sources ([Author], [Year]).

Extreme Weather: Climate change exacerbates extreme weather events, devastating ecosystems. Wildfires ravage forests, disrupting ecosystems and endangering species ([Author], [Year]).

Conclusion:
Climate change poses dire threats to biodiversity. Urgent action is needed to mitigate its impact and safeguard ecosystems for future generations.
In-text citations: ([Author], [Year])`,

  APA: `Title: [Your title here]

Introduction:
Climate change profoundly alters ecosystems, jeopardizing biodiversity worldwide. Understanding its ramifications is essential for devising effective conservation measures.

Body Paragraphs:

Temperature Rise: Increasing global temperatures disrupt ecosystems. For instance, warmer waters lead to coral bleaching, endangering marine biodiversity ([Author], [Year]).

Ice Cap Melting: The melting of ice caps threatens polar habitats. Polar bears, reliant on sea ice for hunting, face dwindling food sources ([Author], [Year]).

Extreme Weather: Climate change exacerbates extreme weather events, devastating ecosystems. Wildfires ravage forests, disrupting ecosystems and endangering species ([Author], [Year]).

Conclusion:
Climate change poses dire threats to biodiversity. Urgent action is needed to mitigate its impact and safeguard ecosystems for future generations.
In-text citations: ([Author], [Year])`,

  Chicago: `Title: [Your title here]

Introduction:
Climate change profoundly alters ecosystems, jeopardizing biodiversity worldwide. Understanding its ramifications is essential for devising effective conservation measures.

Body Paragraphs:

Temperature Rise: Increasing global temperatures disrupt ecosystems. For instance, warmer waters lead to coral bleaching, endangering marine biodiversity ([Author] [Year]).

Ice Cap Melting: The melting of ice caps threatens polar habitats. Polar bears, reliant on sea ice for hunting, face dwindling food sources ([Author] [Year]).

Extreme Weather: Climate change exacerbates extreme weather events, devastating ecosystems. Wildfires ravage forests, disrupting ecosystems and endangering species ([Author] [Year]).

Conclusion:
Climate change poses dire threats to biodiversity. Urgent action is needed to mitigate its impact and safeguard ecosystems for future generations.
In-text citations: ([Author] [Year])`,
  // Add more templates and their text data as needed
};



  useEffect(() => {
    const fetchDocument = async () => {
      console.log(`Documents: ${docId}`)
      const doc = await getDocument('documents', docId);
      if (doc) {
        setDocument(doc);
        setDocumentName(doc.name);
      }
    };
    fetchDocument();
  }, [docId]);

  useEffect(() => {
    if (document) {
      if (!quillInstance.current) {
        const toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean']
        ];

        quillInstance.current = new Quill(quillRef.current, {
          theme: 'snow',
          modules: {
            toolbar: toolbarOptions
          }
        });
      }

      // Set initial content based on selected template
      const content = templateTextData[selectedTemplate];
      if (content) {
        quillInstance.current.root.innerHTML = content;
      }
    }
  }, [document, selectedTemplate]);

  const handleNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  const handleDelete = async () => {
    await deleteDocument('documents', docId);
    navigate(`/project/${projId}`);
  };

  const handleSave = async () => {
    const content = quillInstance.current.getContents();
    const contentJSON = JSON.stringify(content);

    await updateDocument('documents', docId, { name: documentName, content: contentJSON });
    console.log("Document updated");
  };

  const saveAndExit = async () => {
    const content = quillInstance.current.getContents();
    const contentJSON = JSON.stringify(content);

    await updateDocument('documents', docId, { name: documentName, content: contentJSON });
    console.log("Document updated");
    navigate(`/project/${projId}`);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const templateOptions = [
    { value: 'Default', label: 'Default' },
    { value: 'MLA', label: 'MLA' },
    { value: 'APA', label: 'APA' },
    { value: 'Chicago', label: 'Chicago' }
    // Add more template options as needed
  ];

  return (
    <div>
      <input
        type="text"
        value={documentName}
        onChange={handleNameChange}
        placeholder="Document Name"
        style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
      />
      <div className="template-selector">
        <select value={selectedTemplate} onChange={handleTemplateChange}>
          {templateOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button onClick={saveAndExit}>Save and Exit</button>
        <button onClick={handleSave}>Save Document</button>
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
          Delete Document
        </button>
      </div>
      <div className="quill-container">
        <div ref={quillRef} />
      </div>
    </div>
  );
};

export default DocumentViewer;
