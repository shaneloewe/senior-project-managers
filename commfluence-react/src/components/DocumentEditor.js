import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // import styles

const DocumentEditor = ({ onContentChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    const quillInstance = new Quill(quillRef.current, {
      theme: 'snow', // Specify theme
      modules: {
        toolbar: true, // Include toolbar
      },
    });

    quillInstance.on('text-change', () => {
      onContentChange(quillInstance.getContents());
    });
  }, [onContentChange]);

  return <div ref={quillRef} />;
};

export default DocumentEditor;
