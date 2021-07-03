import { useItems, useItemsApi } from '../hooks';
import { Ripple } from 'react-spinners-css';
import NoteList from './NoteList';
import { matchSorter } from 'match-sorter';

const NoteListContainer = ({ search }) => {
    const { data, loading, error, refresh } = useItems();
    const { createItem, deleteItem } = useItemsApi();

    const addNote = async (text) => {
        await createItem({ text });
        refresh();
    };

    const deleteNote = async (id) => {
        await deleteItem({ id });
        refresh();
    };

    if (loading) {
        return (
            <div className="flex justify-content-center">
                <Ripple color="#d1c4e9" />
            </div>
        );
    }

    if (error) {
        return <pre>Woops, something went wrong.</pre>;
    }

    let notes = data;
    if (search.trim()) {
        notes = matchSorter(data, search.trim(), {
            keys: ['text']
        });
        notes.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
    }

    return <NoteList filter={'searchText'} notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} />;
};

export default NoteListContainer;
