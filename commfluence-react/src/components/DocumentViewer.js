import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '../styles/DocumentViewer.css';
import { getDocument, updateDocument, deleteDocument, onDocumentSnapshot } from '../firestoreService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CustomPadding from './CustomPadding';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';

Quill.register('modules/customPadding', CustomPadding);

const DocumentViewer = () => {
  const { projId, docId } = useParams();
  const [currentDocument, setCurrentDocument] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Default'); // State for selected template
  const quillRef = useRef();
  const quillInstance = useRef(null);
  const navigate = useNavigate();

  const [margins, setMargins] = useState({
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  });

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
    if (quillRef.current && !quillInstance.current) {
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
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
        modules: { toolbar: toolbarOptions }
      });
    }
  }, []);

  // Setup real-time subscription to Firestore document
  useEffect(() => {
    if (docId) {
      const docRef = doc(firestore, 'documents', docId);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setDocumentName(data.name);
          if (quillInstance.current) {
            const content = data.content ? JSON.parse(data.content) : '';
            quillInstance.current.setContents(content);
          }
        } else {
          console.log("No such document!");
        }
      }, (error) => {
        console.error("Failed to subscribe to document:", error);
      });

      return () => unsubscribe(); // Cleanup on unmount
    }
  }, [docId]);

  // Optional: If you need to handle changes in Quill and update Firestore
  useEffect(() => {
    if (quillInstance.current) {
      const handler = () => {
        const updatedContent = JSON.stringify(quillInstance.current.getContents());
        updateDocument('documents', docId, { content: updatedContent });
      };
      quillInstance.current.on('text-change', handler);
      return () => {
        quillInstance.current.off('text-change', handler);
      };
    }
  }, [docId]);


  

  useEffect(() => {
    const unsubscribe = onDocumentSnapshot('documents', docId, (error, data) => {
      if (error) {
        console.error(error);
      } else {
        setDocumentData(data);
      }
    });

    return () => unsubscribe();
  }, [docId]);
  

  // Update Quill editor content when document changes
  useEffect(() => {
    if (quillInstance.current) {
      const customPadding = quillInstance.current.getModule('customPadding');
      if (customPadding) {
        // Pass the new margins to the updatePadding method
        customPadding.updatePadding({
          top: `${margins.top}px`,
          right: `${margins.right}px`,
          bottom: `${margins.bottom}px`,
          left: `${margins.left}px`
        });
      }
    }
  }, [margins]);

  const handleMarginChange = (e, side) => {
    console.log(`e: ${e}, side: ${side}`)
    setMargins(prev => ({
      ...prev,
      [side]: parseInt(e.target.value, 10)
    }));
    console.log(`Margins: ${margins.top}`)
  };

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
    handleSave()
    navigate(`/project/${projId}`);
  };

  ///const handleTemplateChange = (event) => {
   /// setSelectedTemplate(event.target.value);
 /// };

  // Function to get HTML content from the editor
  const getQuillContentAsHtml = () => {
    if (quillInstance.current && quillInstance.current.root) {
      return quillInstance.current.root.innerHTML;
    }
    return ''; // Return empty string or a fallback if the editor isn't ready
  };

  // Function to handle PDF export
  // Function to handle PDF export
  const exportToPDF = () => {
    // Convert pixels to mm for jsPDF (1 inch = 25.4 mm, and there are 96 pixels in an inch)
    const mmTopMargin = margins.top / 96 * 25.4;
    const mmLeftMargin = margins.left / 96 * 25.4;

    html2canvas(document.querySelector('.ql-editor'), {
      onclone: (clonedDoc) => {
        const clonedContainer = clonedDoc.querySelector('.quill-container');
        // Apply styles to cloned container if needed
      },
      scale: 1 // Adjust scale if necessary
    }).then((canvas) => {
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      // Calculate the width and height of the image in the PDF taking margins into account
      const pdfWidth = pdf.internal.pageSize.getWidth() - mmLeftMargin - mmLeftMargin; // subtract margins from both sides
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', mmLeftMargin, mmTopMargin, pdfWidth, pdfHeight);
      pdf.save(`${documentName || 'exported-document'}.pdf`);
    });
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
        <select value={selectedTemplate} >
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
        {/* Add the export to PDF button */}
        <button onClick={exportToPDF} style={{ backgroundColor: 'blue', color: 'white' }}>
          Export to PDF
        </button>
        {/* Margin inputs */}
      </div>

      <div className="margin-sliders">
        <label>
          Left Margin:
          <input
            type="range"
            min="0"
            max="96"
            step="12" // This sets the slider to move in increments of 15
            value={margins.left}
            onChange={(e) => handleMarginChange(e, 'left')}
            title={`Current margin: ${margins.left / 96}in`}
          />
        </label>
        <label>
          Top Margin:
          <input
            type="range"
            min="0"
            max="96"
            step="12" // This sets the slider to move in increments of 15
            value={margins.top}
            onChange={(e) => handleMarginChange(e, 'top')}
            title={`Current margin: ${margins.top / 96}in`}
          />
        </label>
      </div>

      <div className="quill-container">
        <div ref={quillRef} className="ql-container">
          {console.log(`Margins: ${margins.top}`)}
          <div className="ql-editor" style={{
            paddingTop: `${margins.top}px`,
            paddingRight: `${margins.right}px`,
            paddingBottom: `${margins.bottom}px`,
            paddingLeft: `${margins.left}px`,
          }}>
            {/* Quill will append its editor here */}
          </div>
        </div>
      </div>
    </div >
  );
};

export default DocumentViewer;
