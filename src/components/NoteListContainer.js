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

    const notes = matchSorter(data, search, { keys: ['text'] });

    return <NoteList filter={'searchText'} notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} />;
};

export default NoteListContainer;
