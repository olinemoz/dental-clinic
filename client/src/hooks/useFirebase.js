import {useEffect, useState} from 'react';
import initializeFirebase from "../Pages/Login/Login/Firebase/firebase.init";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";


initializeFirebase()
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const auth = getAuth();
    const registerUser = (email, password) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError("")
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
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

    const logOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            setError(error.message)
        });
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
        isLoading
    }
};

export default useFirebase;