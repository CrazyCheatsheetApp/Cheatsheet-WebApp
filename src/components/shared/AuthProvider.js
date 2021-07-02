import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../context';
import firebase from 'firebase';

const signIn = async () => {
    try {
        await firebase.auth().signin;
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

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((userDoc) => {
            if (userDoc) {
                setUser(userDoc);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const contextValue = {
        signIn,
        signOut,
        user
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
