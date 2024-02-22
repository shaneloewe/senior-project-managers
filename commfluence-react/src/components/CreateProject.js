import React, { useState } from 'react';
import CreateProjectPopup from '../pages/Projects';


const CreateProject = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleCreateProject = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleSaveProject = (projectName) => {
        // Save the project with the provided name
        console.log("Saving project:", projectName);
    };

    return (
        <div>
            <button onClick={handleCreateProject}>Create New Project</button>
            {showPopup && (
                <CreateProjectPopup onSave={handleSaveProject} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default CreateProject;
