import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');

    const handleChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    };

    return (
        <div className="note new">
            <textarea
                rows="8"
                cols="10"
                placeholder="type your notes"
                value={noteText}
                onChange={handleChange}
            ></textarea>

            <div className="note-footer">
                <button className="grow save" onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;
