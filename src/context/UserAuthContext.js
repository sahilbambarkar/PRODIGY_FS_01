import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,  // Import this for reset functionality
} from "firebase/auth";
import { auth } from "../firebase";  

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);  // Set user to `null` for unauthenticated state

  // Log In function
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign Up function
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Log Out function
  function logOut() {
    return signOut(auth);
  }

  // Google Sign-In function
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // Password Reset function
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);  // Use Firebase's password reset email method
  }

  // Track user state (authenticated/unauthenticated)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,             // Current user state
        logIn,            // Log In function
        signUp,           // Sign Up function
        logOut,           // Log Out function
        googleSignIn,     // Google Sign In function
        resetPassword,    // Password Reset function
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

// Custom Hook to use the Auth Context
export function useUserAuth() {
  return useContext(userAuthContext);
}
