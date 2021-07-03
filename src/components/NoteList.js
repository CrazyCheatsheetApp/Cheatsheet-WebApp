import AddNote from './AddNote';
import Note from './Note';

const NoteListContainer = ({ notes, handleAddNote, handleDeleteNote, handleCopyNote }) => {
    return (
        <div className="notes-list">
            <AddNote handleAddNote={handleAddNote} />
            {notes.map((note) => (
                <Note
                    id={note.id}
                    text={note.text}
                    date={note.updatedAt}
                    handleDeleteNote={handleDeleteNote}
                    handleCopyNote={handleCopyNote}
                    key={note.id}
                />
            ))}
        </div>
    );
};

export default NoteListContainer;
