import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../context';
import firebase from 'firebase';

const signIn = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
        return Promise.reject(e);
    }
};

const signOut = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        return Promise.reject(e);
    }
};

const register = async (email, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
        return Promise.reject(e);
    }
};

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        loading: true
    });

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((userDoc) => {
            if (userDoc) {
                setState({
                    user: userDoc,
                    loading: false
                });
            } else {
                setState({
                    user: null,
                    loading: false
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const contextValue = {
        signIn,
        signOut,
        register,
        ...state
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
