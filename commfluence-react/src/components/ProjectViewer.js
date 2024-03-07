import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { getDocuments, getCurrentProject, deleteProject } from '../firestoreService.js'; // Import the Firestore function
import { useParams, useNavigate } from 'react-router-dom'; // If you are using react-router
import '../styles/DocumentPage.css'; // Adjust the path if necessary
import '../styles/Header.css';
import Header from './Header.js';

const ProjectViewer = () => {
  const [documents, setDocuments] = useState([]);
  const [projectName, setProjectName] = useState('Loading...');
  const { projId } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    const fetchDocuments = async () => {
      if (projId) {
        const docs = await getDocuments('documents', projId);
        setDocuments(docs);
        const proj = await getCurrentProject('Projects', projId);
        const projName = proj.get('name');
        setProjectName(projName);
      }
    };

    fetchDocuments();
  }, [projId]);

  const openDocument = (docId) => {
    // Navigate to the document editor/viewer page with the docId
    navigate(`/project/${projId}/${docId}`);
  };

  const handleCreateNewDocument = () => {
    navigate(`/project/${projId}/create-document`); // Assuming this is the route for CreateDocument
  };

  const handleDelete = async () => {
    await deleteProject('Projects', projId);
    navigate(`/projects`);
  };

  return (
    <div class='logged-in'>
      <Header />
      <div class="banner-container">
        <a href="/projects" class="back-button">〈</a>
        <h1 class='projects-banner'>{projectName}</h1>
        <button className="deleteProject" onClick={handleDelete}>
          Delete
        </button>
        <div class="spacer"></div>
        <h1 class='taskboard'>Taskboard</h1>
      </div>
      <h1 class="page-title">Documents</h1>
      <div class="parent-container">
        <div class="grid-container">
          {documents.map(doc => (
            <div
              key={doc.id}
              onClick={() => openDocument(doc.id)}
              className="grid-item"
            >
              {doc.name}
            </div>
          ))}
          <button
            onClick={handleCreateNewDocument}
            class="create-document-button"
          >
            +
          </button>
        </div>
        <div class="task-container">
          <div class="task-card">Hi</div>
          <div class="task-card">Hoy</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;