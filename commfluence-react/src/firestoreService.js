import { firestore, auth } from './firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, setDoc, arrayUnion } from 'firebase/firestore';

// Add a new document
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), {
      ...data,
      projId: data.projId,
    });
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getDocuments = async (collectionName, projId) => {
  try {
    const q = query(collection(firestore, collectionName), where("projId", "==", projId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};


// Get document from a collection
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data()); // Debugging line
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!"); // Debugging line
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};


// Update a document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Delete a document
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

// Add a new project
export const addProject = async (collectionName, projectName, currentUser) => {
  console.log(currentUser);
  try {
    const docRef = await addDoc(collection(firestore, collectionName), {
      name: projectName,
      users: [currentUser.uid],
      tasks: {}
    });
    return docRef.id; // Return the ID of the newly added project document
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

// Get project from collection
export const getProjects = async (collectionName) => {
  try {
    const currentUser = auth.currentUser; // Get current logged-in user
    if (!currentUser) {
      throw new Error("No user logged in");
    }

    // Query projects where the current user's UID exists in the 'users' array
    const q = query(collection(firestore, collectionName), where("users", "array-contains", currentUser.uid));
    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error("Error getting projects: ", error);
    throw error;
  }
};


export const getCurrentProject = async (collectionName, projId) => {
  try {
    const docRef = doc(firestore, collectionName, projId);
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

// Update project
export const updateProject = async (collectionName, projId, data) => {
  try {
    const projRef = doc(firestore, collectionName, projId);
    await updateDoc(projRef, data);
  } catch (error) {
    console.error("Error updating project: ", error);
  }
};

// Delete a project
export const deleteProject = async (collectionName, projId) => {
  try {
    const projRef = doc(firestore, collectionName, projId);
    await deleteDoc(projRef);
  } catch (error) {
    console.error("Error deleting project: ", error);
  }
};

export const addUser = async (collectionName, data) => {
  try {
    // Create a reference to the document with the specified UID
    const userRef = doc(firestore, collectionName, data.uid);

    // Set the document with the provided data
    await setDoc(userRef, {
      ...data,
      name: "",
      email: data.email // Since the UID is the document ID, no need to store it separately
    });

    return userRef; // Return the document reference
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const getUsers = async (collectionName, projId) => {
  try {
    const docRef = doc(firestore, collectionName, projId);
    const docSnap = await getDoc(docRef);
    const users = docSnap.data().users; // Access the users field
    console.log("Users baby: " + users)
    return users; // Return the users array
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

const addUserToProject = async (email, projectId) => {
  try {
    // Step 1: Find user by email
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    let userId;
    querySnapshot.forEach((doc) => {
      userId = doc.id; // The user's UID is the document ID
    });

    if (!userId) {
      throw new Error('User not found');
    }

    // Step 2: Add the user's UID to the project's users array
    const projectRef = doc(firestore, 'Projects', projectId);
    await updateDoc(projectRef, {
      users: arrayUnion(userId)
    });

  } catch (error) {
    console.error('Error adding user to project:', error);
    throw error;
  }
};

export { addUserToProject };

// Add a new task
export const addTask = async (projId, task) => {
  try {
    // Reference to the project document in the "projects" collection
    const projRef = doc(firestore, "Projects", projId);
    const projSnap = await getDoc(projRef);

    console.log(projId)
    console.log(projRef)
    console.log(projSnap)
    console.log(task)

    let projectData = projSnap.data();
    console.log(`Project Snap Data: ${projSnap.data()}`)
    let tasks = projectData.tasks || {}; // Ensure tasks is an object if it doesn't exist

    // Use the ID from the task object as the key for the new task
    const taskId = task.id; // Assuming `id` is part of the task object

    // Log for debugging
    console.log(`Adding task to project ${projId}:`, task);

    // Add the new task to the tasks dictionary
    tasks[taskId] = task;

    // Update the project document with the new tasks object
    await updateDoc(projRef, {
      tasks // Update the tasks field with the new tasks object
    });

    console.log("Task added successfully!");
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

// Function to delete a task from a project
export const deleteTask = async (projId, taskId) => {
  const projRef = doc(firestore, 'Projects', projId);
  // Get the current project data
  const projSnap = await getDoc(projRef);

  if (projSnap.exists()) {
    const projData = projSnap.data();
    const tasks = projData.tasks || {};
    // Remove the task from the tasks object
    delete tasks[taskId];
    // Update the project document without the deleted task
    await updateDoc(projRef, { tasks });
  } else {
    console.error('Project document does not exist.');
  }
};

export const updateTaskStatus = async (projId, taskId, newStatus) => {
  // Reference the specific project document in Firestore
  const projectRef = doc(firestore, 'Projects', projId);

  // Prepare the update object to set the new status for the specific task
  const statusUpdate = {
    [`tasks.${taskId}.status`]: newStatus // This uses JavaScript computed property names
  };

  // Update the 'tasks' field within the project document
  try {
    await updateDoc(projectRef, statusUpdate);
    console.log(`Task ${taskId} in project ${projId} updated to status: ${newStatus}`);
  } catch (error) {
    console.error("Error updating task status: ", error);
  }
};