import autosize from 'autosize';
import { useRef } from 'react';
import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const ref = useRef();

    const handleChange = (event) => {
        setNoteText(event.target.value);
        autosize(ref.current);
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    };

    return (
        <div className="note new">
            <div className="note-header">
                <textarea
                    rows="8"
                    cols="10"
                    placeholder="type your notes"
                    value={noteText}
                    onChange={handleChange}
                    ref={ref}
                ></textarea>
            </div>
            <div className="note-footer">
                <button className="grow save" onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;
