import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { getDocuments, getCurrentProject, deleteProject, addUserToProject, deleteTask } from '../firestoreService.js';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DocumentPage.css';
import '../styles/Header.css';
import Header from './Header.js';
import UserListPopup from './UserListPopup';
import NewTaskPopup from './NewTaskPopup.js';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import collabIcon from '../styles/collabIcon.jpg';

const ProjectViewer = () => {
  const [documents, setDocuments] = useState([]);
  const [projectName, setProjectName] = useState('Loading...');
  const { projId } = useParams();
  const [showUsersPopup, setShowUsersPopup] = useState(false);
  const [showTasksPopup, setShowTasksPopup] = useState(false);
  const [projectUsers, setProjectUsers] = useState([]);
  const [tasks, setTasks] = useState({});

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
        const projTasks = proj.get('tasks') || {};
        const projName = proj.get('name');
        setProjectName(projName);
        setTasks(projTasks);
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
        fetchUserDetails(userIds);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const fetchUserDetails = async (userIds) => {
    const userDetails = [];

    for (const userId of userIds) {
      try {
        const userRef = doc(firestore, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          userDetails.push({
            email: userData.email,
            color: userData.color // Assuming color is stored in the userData
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    console.log("Retrieved users:", userDetails); // Log the user details
    setProjectUsers(userDetails);
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

  const toggleUsersPopup = () => {
    setShowUsersPopup(!showUsersPopup);
  };

  const toggleTasksPopup = () => {
    setShowTasksPopup(!showTasksPopup);
  };

  const handleDeleteTask = async (taskId) => {
    // Call the deleteTask function from firestoreService
    try {
      await deleteTask(projId, taskId);
      // Remove the task from local state to update the UI
      const updatedTasks = { ...tasks };
      delete updatedTasks[taskId];
      setTasks(updatedTasks);
      // Optionally, add an alert or notification to indicate success
    } catch (error) {
      console.error('Error deleting task:', error);
      // Optionally, handle the error in the UI
    }
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
        <button onClick={toggleUsersPopup} className="open-popup-button">
          <img src={collabIcon} alt="User List" />
        </button>
        {showUsersPopup && (
          <UserListPopup
            users={projectUsers}
            onAddUser={handleAddUserByEmail}
            onClose={toggleUsersPopup}
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
          {Object.entries(tasks).map(([taskId, taskDetails]) => (
            <div key={taskId} className="task-card">
              <h3>{taskDetails.name}</h3>
              <p>Due: {taskDetails.due_date}</p>
              <p>Status: {taskDetails.status}</p>
              <p>Assigned To: {taskDetails.assignedTo}</p>
              {/* Add a delete button to each task card */}
              <button onClick={() => handleDeleteTask(taskId)} className="delete-task-button">
                Delete Task
              </button>
            </div>
          ))}
          {/* Preserve the existing Add task button */}
          <button
            onClick={toggleTasksPopup}
            className="create-task-card"
          >
            Add task
          </button>
          {/* Preserve the NewTaskPopup modal */}
          {console.log(`projectUsers: ${projectUsers}`)}
          {showTasksPopup && (
            <NewTaskPopup
              project={projId}
              onClose={toggleTasksPopup}
              users={projectUsers}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
