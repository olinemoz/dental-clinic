import {useEffect, useState} from 'react';
import initializeFirebase from "../Pages/Login/Login/Firebase/firebase.init";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import axios from "axios";


initializeFirebase()
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const auth = getAuth();
    const registerUser = (email, password, history, name) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateUserName(name)
                saveUser(email, name)
                history.replace('/')
                setError("")
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            setError("")
        }).catch((error) => {
            setError(error.message)
        });
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location.state?.from || '/'
                // console.log("HISTORY: ", destination)
                history.replace(destination)
                setError("")

            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    const handleGoogleSignedIn = (location, history) => {
        setIsLoading(true)
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user
                saveGoogleUser(user.email, user.displayName)
                const destination = location.state?.from || '/'
                history.replace(destination)
                setError("")
            }).catch((error) => {
            setError(error.message)
        })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const logOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            setError(error.message)
        });
    }

    const saveUser = (email, displayName) => {
        const user = {email, displayName}
        axios.post(`http://localhost:5000/users`, user)
            .then()
    }

    const saveGoogleUser = (email, displayName) => {
        const user = {email, displayName}
        axios.put(`http://localhost:5000/users`, user)
            .then()
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        })
        // return ()=> unsubscribed
    }, [auth])


    return {
        user,
        registerUser,
        loginUser,
        logOut,
        error,
        isLoading,
        handleGoogleSignedIn
    }
};

export default useFirebase;