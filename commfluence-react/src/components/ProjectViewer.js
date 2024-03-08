import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { getDocuments, getCurrentProject, deleteProject, addUserToProject } from '../firestoreService.js';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DocumentPage.css';
import '../styles/Header.css';
import Header from './Header.js';
import UserListPopup from './UserListPopup';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import collabIcon from '../styles/collabIcon.jpg';

const ProjectViewer = () => {
  const [documents, setDocuments] = useState([]);
  const [projectName, setProjectName] = useState('Loading...');
  const { projId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [projectUsers, setProjectUsers] = useState([]);

  const navigate = useNavigate();

  const handleAddUserByEmail = async (email) => {
    try {
      await addUserToProject(email, projId);
      fetchProjectUsers(); // Refresh the user list after adding a user
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      if (projId) {
        const docs = await getDocuments('documents', projId);
        setDocuments(docs);
        const proj = await getCurrentProject('Projects', projId);
        const projName = proj.get('name');
        setProjectName(projName);
        fetchProjectUsers(); // Fetch users when component mounts or projId changes
      }
    };

    fetchDocuments();
  }, [projId]);

  const fetchProjectUsers = async () => {
    try {
      const project = await getCurrentProject('Projects', projId);
      const userIds = project.get('users');

      if (userIds && userIds.length > 0) {
        fetchUserEmails(userIds);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };
  
  const fetchUserEmails = async (userIds) => {
    const userEmails = [];

    for (const userId of userIds) {
      try {
        const userRef = doc(firestore, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          userEmails.push(userSnap.data().email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    console.log("Retrieved users:", userEmails); // Log the emails
    setProjectUsers(userEmails);
  };

  const openDocument = (docId) => {
    navigate(`/project/${projId}/${docId}`);
  };

  const handleCreateNewDocument = () => {
    navigate(`/project/${projId}/create-document`);
  };

  const handleDelete = async () => {
    await deleteProject('Projects', projId);
    navigate(`/projects`);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='logged-in'>
      <Header />
      <div className="banner-container">
        <a href="/projects" className="back-button">〈</a>
        <h1 className='projects-banner'>{projectName}</h1>
        <button className="deleteProject" onClick={handleDelete}>
          Delete
        </button>
        <button onClick={togglePopup} className="open-popup-button">
          <img src={collabIcon} alt="User List" />
        </button>
        {showPopup && (
          <UserListPopup 
            users={projectUsers}
            onAddUser={handleAddUserByEmail}
            onClose={togglePopup}
          />
        )}
        <div className="spacer"></div>
        <h1 className='taskboard'>Taskboard</h1>
      </div>
      <h1 className="page-title">Documents</h1>
      <div className="parent-container">
        <div className="grid-container">
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
            className="create-document-button"
          >
            +
          </button>
        </div>
        <div className="task-container">
          <div className="task-card">Hi</div>
          <div className="task-card">Hoy</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
