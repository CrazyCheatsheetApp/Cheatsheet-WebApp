import AddNote from './AddNote';
import Note from './Note';

const NoteListContainer = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <div className="notes-list">
            <AddNote handleAddNote={handleAddNote} />
            {notes.map((note) => (
                <Note
                    id={note.id}
                    text={note.text}
                    date={note.updatedAt}
                    handleDeleteNote={handleDeleteNote}
                    key={note.id}
                />
            ))}
        </div>
    );
};

export default NoteListContainer;
