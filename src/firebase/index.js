import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "@firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "chorechracker.appspot.com",
    messagingSenderId: "851274142863",
    appId: "1:851274142863:web:f5eaadf93d7e4b378c4cfa",
    measurementId: "G-265G9Z34GK"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export { auth, signOutUser };
