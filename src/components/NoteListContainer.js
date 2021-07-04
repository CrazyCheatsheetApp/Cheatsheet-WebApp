import { useItems, useItemsApi } from '../hooks';
import { Ripple } from 'react-spinners-css';
import NoteList from './NoteList';
import { matchSorter } from 'match-sorter';
import { useEffect } from 'react';

const NoteListContainer = ({ search }) => {
    const { data, loading, error, refresh } = useItems();
    const { createItem, deleteItem } = useItemsApi();

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const addNote = async (text) => {
        await createItem({ text });
        refresh();
    };

    const deleteNote = async (id) => {
        await deleteItem({ id });
        refresh();
    };

    const copyNote = (text) => {
        // If running in an iframe, use message passing
        if (window.location !== window.parent.location) {
            window.parent.postMessage(
                JSON.stringify({
                    action: 'write-clipboard',
                    text
                }),
                '*'
            );
        } else {
            navigator.clipboard.writeText(text);
        }
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

    return (
        <NoteList
            filter={'searchText'}
            notes={notes}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            handleCopyNote={copyNote}
        />
    );
};

export default NoteListContainer;
