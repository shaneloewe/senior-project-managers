import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill stylesheet

const QuillEditor = ({ content, onSave }) => {
  const quillRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (quillRef.current) {
      const editorInstance = new Quill(quillRef.current, {
        theme: 'snow',
        // Add any Quill modules here
      });
      setEditor(editorInstance);
    }
  }, []);

  useEffect(() => {
    if (editor && content) {
      // Make sure content is a string
      const validContent = typeof content === 'string' ? content : '';
      editor.clipboard.dangerouslyPasteHTML(validContent);
    }
  }, [editor, content]);

  const handleSave = () => {
    if (editor) {
      const content = editor.root.innerHTML;
      onSave(content); // onSave is a prop function to handle saving content
    }
  };

  return (
    <div>
      <div ref={quillRef} />
      <button onClick={handleSave}>Save Document</button>
    </div>
  );
};

export default QuillEditor;
