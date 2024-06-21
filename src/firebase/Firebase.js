import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBtaXnqAnxuOy8iaOILEnVYBqdMktHkc4",
  authDomain: "task-management-f7fff.firebaseapp.com",
  projectId: "task-management-f7fff",
  storageBucket: "task-management-f7fff.appspot.com",
  messagingSenderId: "310931511619",
  appId: "1:310931511619:web:47713ee5616046b36d77f6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };