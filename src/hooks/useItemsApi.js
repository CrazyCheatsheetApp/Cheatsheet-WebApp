import firebase from 'firebase';
import { useContext } from 'react';
import { AuthContext } from '../context';

const documentDataToItem = (doc) => {
    let { createdAt, updatedAt, ...data } = doc.data();
    return {
        id: doc.id,
        createdAt: createdAt.toDate(),
        updatedAt: createdAt.toDate(),
        ...data
    };
};

const useItemsApi = () => {
    const { user } = useContext(AuthContext);

    const COLLECTION_NAME = 'items';
    const db = firebase.firestore();
    const collection = db.collection(COLLECTION_NAME);

    const addItem = async (text) => {
        try {
            let now = new Date();
            let docRef = await collection.add({ userId: user.uid, text, createdAt: now, updatedAt: now });
            return docRef.id;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const getItems = async () => {
        try {
            let snapshot = await collection.where('userId', '==', user.uid).orderBy('updatedAt', 'desc').get();
            return snapshot.docs.map(documentDataToItem);
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const removeItem = async (id) => {
        try {
            await collection.doc(id).delete();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const updateItem = async (id, item) => {
        let { id: _, userId, createdAt, updatedAt, ...data } = item;
        try {
            await collection.doc(id).update({ ...data });
        } catch (e) {
            return Promise.reject(e);
        }
    };

    return { addItem, getItems, removeItem, updateItem };
};

export default useItemsApi;
