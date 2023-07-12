import app from "../FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logOutUser = () => {
  return signOut(auth);
};

const sendResetEmail = (email) => {
  return sendPasswordResetEmail(auth, email);
};

const subscribeToAuthChanges = (handleAuthChange) => {
  onAuthStateChanged(auth, (user) => {
    handleAuthChange(user);
  });
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logOutUser,
  sendResetEmail,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
