import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXiJP5CNzLDjjDmQbW9socBT_YO9a1gpY",
  authDomain: "mytodolist-26ee8.firebaseapp.com",
  projectId: "mytodolist-26ee8",
  storageBucket: "mytodolist-26ee8.appspot.com",
  messagingSenderId: "698724365091",
  appId: "1:698724365091:web:4c50a5d9f9017addf31296"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}