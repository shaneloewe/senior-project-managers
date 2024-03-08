import { firestore } from './firebase';
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
      users: [currentUser.uid]
    });
    return docRef.id; // Return the ID of the newly added project document
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

// Get project from collection
export const getProjects = async (collectionName, projId) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
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
      email: data.email // Since the UID is the document ID, no need to store it separately
    });

    return userRef; // Return the document reference
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error; // Rethrow the error to be handled by the caller
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
