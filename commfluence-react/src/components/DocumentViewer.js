import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '../styles/DocumentViewer.css';
import { getDocument, updateDocument, deleteDocument } from '../firestoreService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CustomPadding from './CustomPadding';

Quill.register('modules/customPadding', CustomPadding);

const DocumentViewer = () => {
  const { projId, docId } = useParams();
  const [currentDocument, setCurrentDocument] = useState(null);
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



  // Initialize Quill editor
  useEffect(() => {
    if (!quillInstance.current && quillRef.current) {
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
        modules: {
          toolbar: toolbarOptions,
          customPadding: {
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
          }
        }
      });
    }
  }, []); // Empty dependency array ensures this only runs once on component mount.

  // Fetch the document when docId changes
  useEffect(() => {
    const fetchDocumentData = async () => {
      if (docId) {
        const docData = await getDocument('documents', docId);
        if (docData) {
          setCurrentDocument(docData);
          setDocumentName(docData.name);
          // Check if margins are saved and set them
          if (docData.margins) {
            setMargins(docData.margins);
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchDocumentData();
  }, [docId]); // Dependency on docId ensures this runs when docId changes.

  // Update Quill editor content when document changes
  useEffect(() => {
    if (currentDocument && currentDocument.content && quillInstance.current) {
      const contentDelta = JSON.parse(currentDocument.content);
      quillInstance.current.setContents(contentDelta);
    } else {
      // Handle setting up the initial content/template if document is not set
      const content = templateTextData[selectedTemplate];
      if (quillInstance.current && content) {
        quillInstance.current.clipboard.dangerouslyPasteHTML(0, content);
      }
    }
  }, [currentDocument, selectedTemplate]); // Dependency on document and selectedTemplate.

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

    const docData = {
      name: documentName,
      content: contentJSON,
      margins // assuming margins is an object like { top: 20, right: 20, bottom: 20, left: 20 }
    };

    await updateDocument('documents', docId, docData);
    console.log("Document updated");
  };

  const saveAndExit = async () => {
    handleSave()
    navigate(`/project/${projId}`);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

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
        <label>
          Right Margin:
          <input
            type="range"
            min="0"
            max="96"
            step="12" // This sets the slider to move in increments of 15
            value={margins.right}
            onChange={(e) => handleMarginChange(e, 'right')}
            title={`Current margin: ${margins.right / 96}in`}
          />
        </label>
        <label>
          Bottom Margin:
          <input
            type="range"
            min="0"
            max="96"
            step="12" // This sets the slider to move in increments of 15
            value={margins.bottom}
            onChange={(e) => handleMarginChange(e, 'bottom')}
            title={`Current margin: ${margins.bottom / 96}in`}
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
