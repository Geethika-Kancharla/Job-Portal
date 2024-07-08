import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAwBQz43kAL6Q5a9CNoOLimosKoxdDdov4",
    authDomain: "jobportal-b4202.firebaseapp.com",
    projectId: "jobportal-b4202",
    storageBucket: "jobportal-b4202.appspot.com",
    messagingSenderId: "582809822473",
    appId: "1:582809822473:web:d969dda5b8df029cb01fd8"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export const useFirebase = () => {
    const firebase = useContext(FirebaseContext);
    if (!firebase) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return firebase;
}

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if (user)
                setUser(user);
            else
                setUser(null);
        })
    }, [])

    const signinUserWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const signinWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider);
    }

    const sendPReset = (email) => {
        sendPasswordResetEmail(firebaseAuth, email);
    }

    const isLoggedIn = user ? true : false;

    return (

        <FirebaseContext.Provider value={{
            signinUserWithEmailAndPassword,
            signinWithGoogle,
            sendPReset,
            isLoggedIn,
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}