import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addTask } from '../firestoreService';
import { v4 as uuidv4 } from 'uuid'; // Ensure you have uuid installed: npm install uuid
import '../styles/UserListPopup.css';

const NewTaskPopup = ({ onClose, users, allDocs, onAddNewTask }) => {
  console.log(`Users: ${users}`)
  console.log(`Documents: ${allDocs}`)
  const [taskInfo, setTaskInfo] = useState({
    assignedUser: '',
    taskName: '',
    dueDate: '',
    currentStatus: '',
    parentDoc: ''
  });
  const { projId } = useParams();
  const navigate = useNavigate();

  if (allDocs.length == 0) {
    console.log("Yo");
    allDocs.push("Temp");
    console.log(allDocs);
  }

  const handleChange = (e) => {
    setTaskInfo({ ...taskInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Prepare the task object including the generated unique task ID
    const newTask = {
      id: uuidv4(), // This will be the unique identifier for the task
      assignedTo: taskInfo.assignedUser,
      name: taskInfo.taskName,
      due_date: taskInfo.dueDate,
      parent_doc: taskInfo.parentDoc,
      status: taskInfo.currentStatus
    };

    try {
      // Call addTask with the projId and the newTask object
      await addTask(projId, newTask);
      onAddNewTask(newTask); // Update parent component's state with the new task
      onClose(); // Close the popup after adding
      navigate(`/project/${projId}`); // Optionally navigate to the project page
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="task-popup-content">
        <button onClick={onClose} className="close-popup">X</button>
        <input
          type="text"
          name="taskName"
          value={taskInfo.taskName}
          onChange={handleChange}
          placeholder="Enter task name"
        />
        <select
          name="assignedUser"
          value={taskInfo.assignedUser}
          onChange={handleChange}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.email} {/* Assuming you want to display the email; adjust as needed */}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="dueDate"
          value={taskInfo.dueDate}
          onChange={handleChange}
        />
        <select
          name="currentStatus"
          value={taskInfo.currentStatus}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          name="parentDoc"
          value={taskInfo.parentDoc}
          onChange={handleChange}
        >
          <option value="">Assign to Document</option>
          {allDocs.map((document) => (
            <option key={document.id} value={document.name}>
              {document.name} {/* Assuming you want to display the email; adjust as needed */}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Add Task</button>
      </div>
    </div>
  );
};

export default NewTaskPopup;
