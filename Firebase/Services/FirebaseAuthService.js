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
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return "Logged in";
    })
    .catch((error) => {
      return error.code;
    });
};

const logOutUser = () => {
  return signOut(auth);
};

const sendResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Email sent!";
  } catch (error) {
    switch (error.code) {
      case "auth/missing-email":
        return "Email is required. Please try again.";
      case "auth/invalid-email":
        return "Invalid email. Please try again.";
      case "auth/user-not-found":
        return "Email is not registered. Please try again.";
      case "auth/too-many-requests":
        return "Too many requests. Try again later.";
      default:
        return error.code;
    }
  }
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
