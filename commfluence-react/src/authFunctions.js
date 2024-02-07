import { auth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase'; // Adjust the path as necessary

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};


export const firebaseLogout = () => {
  return signOut(auth);
};


export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
