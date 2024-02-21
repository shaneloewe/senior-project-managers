import React, { useEffect, useState } from 'react';
import { getProjects, addProject } from '../firestoreService'; // Import the Firestore function
import { useNavigate } from 'react-router-dom'; // If you are using react-router
import '../styles/ProjectsPage.css'; // Adjust the path if necessary
import '../styles/Header.css';
import Header from '../components/Header.js';

const CreateProjectPopup = ({ onSave, onClose }) => {
    const [projectName, setProjectName] = useState('');

    const handleSave = () => {
        onSave(projectName);
        onClose();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Create New Project</h2>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Project Name"
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Discard</button>
            </div>
        </div>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const projs = await getProjects('Projects'); // Fetch projects from Firestore
            setProjects(projs);
            console.log("Running useEffect");
        };

        fetchProjects();
    }, []);

    const openProject = (projId) => {
        // Navigate to the document editor/viewer page with the docId
        navigate(`/project/${projId}`);
    };

    const handleCreateProject = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleSaveProject = async (projectName) => {
        try {
            // Save the project in Firestore
            console.log("Saving project:", projectName);
            const projId = await addProject('Projects', projectName);
            // Redirect to the newly created project
            navigate(`/project/${projId}`);
        } catch (error) {
            console.error("Error saving project: ", error);
        }
    };

    return (
        <div class='logged-in'>
            <Header />
            <h1 class="projects-page-title">Projects</h1>
            <div class="project-grid-container">
                {projects.map(proj => (
                    <div
                        key={proj.id}
                        onClick={() => openProject(proj.id)}
                        className="project-grid-item"
                    >
                        {proj.name}
                    </div>
                ))}
                <button
                    onClick={handleCreateProject}
                    class="create-project-button"
                >
                    +
                </button>
                {showPopup && (
                    <CreateProjectPopup onSave={handleSaveProject} onClose={handleClosePopup} />
                )}
            </div>
        </div>
    );
};

export default Projects;