import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Add this line to import the default Quill stylesheet

const QuillEditor = () => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      new Quill(quillRef.current, {
        theme: 'snow' // Specify the theme you want to use ('snow' is a good starting point)
      });
    }
  }, []);

  return <div ref={quillRef} />;
};

export default QuillEditor;
