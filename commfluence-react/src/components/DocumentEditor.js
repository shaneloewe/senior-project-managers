import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // import styles

const DocumentEditor = ({ onContentChange, initialContent }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    const quillInstance = new Quill(quillRef.current, {
      theme: 'snow', // Specify theme
      modules: {
        toolbar: true, // Include toolbar
      },
    });

    // Set initial content if present
    if (initialContent) {
      quillInstance.setContents(initialContent);
    }

    quillInstance.on('text-change', () => {
      onContentChange(quillInstance.getContents());
    });
  }, [onContentChange, initialContent]);

  return <div ref={quillRef} />;
};

export default DocumentEditor;
