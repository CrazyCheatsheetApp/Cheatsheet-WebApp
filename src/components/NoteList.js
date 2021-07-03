import AddNote from './AddNote';
import Note from './Note';

const NoteListContainer = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <div className="notes-list">
            {notes.map((note) => (
                <Note
                    id={note.id}
                    text={note.text}
                    date={note.updatedAt}
                    handleDeleteNote={handleDeleteNote}
                    key={note.id}
                />
            ))}
            <AddNote handleAddNote={handleAddNote} />
        </div>
    );
};

export default NoteListContainer;
