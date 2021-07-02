import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useContext, useEffect } from 'react';
import './App.css';
import { AuthContext } from './context';
import { useItems, useItemsApi } from './hooks';
import logo from './logo.svg';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
    // signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID]
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID]
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

function App() {
    const { user, signIn, signOut } = useContext(AuthContext);
    const { createItem, readItems, updateItem, deleteItem } = useItemsApi();
    // const { data, loading, error } = useItems();

    useEffect(() => {
        if (!user) return;

        const test = async () => {
            let id = await createItem({
                text: 'Hello world!'
            });
            console.log('useItemsApi', id);
            let items = await readItems();
            console.log('useItemsApi', items);
        };

        test();
    }, [user, createItem, readItems]);

    // console.log('useItems', data, loading, error);

    if (!user) {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
                <StyledFirebaseAuth
                    className={{ position: 'fixed', top: 0 }}
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
