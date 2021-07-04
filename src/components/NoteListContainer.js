import debounce from 'debounce';
import { matchSorter } from 'match-sorter';
import { useEffect } from 'react';
import { Ripple } from 'react-spinners-css';
import { useItems, useItemsApi } from '../hooks';
import NoteList from './NoteList';

// #TODO: Only reload items that have changed
const NoteListContainer = ({ search }) => {
    const { data, loading, error, refresh } = useItems();
    const { createItem, deleteItem, updateItem } = useItemsApi();

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const handleAddNote = async (text) => {
        await createItem({ text });
        refresh();
    };

    const handleDeleteNote = async (id) => {
        await deleteItem({ id });
        refresh();
    };

    const handleCopyNote = (text) => {
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

    const handleUpdate = debounce(async (item) => {
        await updateItem(item);
        refresh();
    }, 1000);

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
            handleAddNote={handleAddNote}
            handleDeleteNote={handleDeleteNote}
            handleCopyNote={handleCopyNote}
            handleUpdate={handleUpdate}
        />
    );
};

export default NoteListContainer;
