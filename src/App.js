import firebase from 'firebase/app';
import 'firebase/auth';
import { useContext, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Ripple } from 'react-spinners-css';
import Header from './components/Header';
import NoteListContainer from './components/NoteListContainer';
import Search from './components/search';
import { AuthContext } from './context';

const firebaseConfig = {
    apiKey: 'AIzaSyA2dtJug4PcxPzt1f3cs4fbJ-shcYICuCY',
    authDomain: 'crazycheatsheetapp.firebaseapp.com',
    projectId: 'crazycheatsheetapp',
    storageBucket: 'crazycheatsheetapp.appspot.com',
    messagingSenderId: '780015384193',
    appId: '1:780015384193:web:5ee1bfaf99c412a9a13f80',
    measurementId: 'G-H2MHM11CZV'
};

// Configure FirebaseUI.
const uiConfig = {
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const App = () => {
    const [searchText, setSearchText] = useState('');
    const { loading, user } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-content-center align-items-center fh">
                <Ripple color="#d1c4e9" />
            </div>
        );
    }

    if (!user) {
        return (
            <StyledFirebaseAuth
                className={{ position: 'fixed', top: 0 }}
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        );
    }

    return (
        <div className="container">
            <Header />
            <Search handleSearchNote={setSearchText} />
            <NoteListContainer search={searchText} />
        </div>
    );
};

export default App;
