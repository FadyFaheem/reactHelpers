import app from "../FirebaseConfig";

import {
  getFirestore,
  getDocs,
  collection,
  updateDoc,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const createDocument = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef;
};

const getDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

const getAllDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
};

const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return updateDoc(docRef, {
      ...data,
    });
  } else {
    return null;
  }
};

const removeDocument = async (collectionName, id) => {
  const deltedDoc = await deleteDoc(doc(db, collectionName, id));
  return deltedDoc;
};

const FirebaseFirestoreService = {
  createDocument,
  getDocument,
  getAllDocuments,
  updateDocument,
  removeDocument,
};

export default FirebaseFirestoreService;
