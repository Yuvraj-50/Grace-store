// Import the functions you need from the SDKs you need
import { AutoFixHigh, Password } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQu8D0_DokztQf7z3nq6UpSFr61xJqU5s",
  authDomain: "e-commerce-website-682c4.firebaseapp.com",
  projectId: "e-commerce-website-682c4",
  storageBucket: "e-commerce-website-682c4.appspot.com",
  messagingSenderId: "337705134625",
  appId: "1:337705134625:web:9af0d2a6e0b21431af1160",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState();

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, { displayName });
      setUser(user);
      return user;
    });

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });

  const signOutUser = () => signOut(auth).then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => unsubscribe();
  });

  return { signUp, signIn, signOutUser, user };
}

export default AuthProvider;
