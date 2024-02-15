import { firestore } from './firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// Add a new document
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getDocuments = async (collectionName, userId) => {
  try {
    const q = query(collection(firestore, collectionName), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
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
