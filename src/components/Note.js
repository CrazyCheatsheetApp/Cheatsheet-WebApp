import autosize from 'autosize';
import { debounce } from 'debounce';
import { useEffect, useRef, useState } from 'react';
import { MdClose, MdContentCopy } from 'react-icons/md';
import TimeAgo from 'react-timeago';
import { useItemsApi } from '../hooks';

const Note = ({ id, text, date, handleDeleteNote, handleCopyNote }) => {
    const { updateItem } = useItemsApi();
    const [content, setContent] = useState(text);
    const [updatedAt, setUpdatedAt] = useState(date);
    const [saving, setSaving] = useState(false);
    const ref = useRef();

    useEffect(() => {
        handleInput();
    });

    const handleUpdate = debounce((text, updatedAt) => {
        console.log('update', text, updatedAt);
        // #TODO Fix debounce not working
        updateItem({
            id,
            item: {
                text,
                updatedAt
            }
        });
        setSaving(false);
    }, 1000);

    const handleChange = (e) => {
        let text = e.target.value;
        let updatedAt = new Date();
        setContent(text);
        setUpdatedAt(updatedAt);
        setSaving(true);
        handleUpdate(text, updatedAt);
    };

    const handleInput = () => {
        autosize(ref.current);
    };

    return (
        <div className="note grow-note">
            <div className="note-header">
                <textarea ref={ref} value={content} onChange={handleChange} onInput={handleInput}></textarea>
                <MdClose onClick={() => handleDeleteNote(id)} className="delete-icon" size="1.3em" />
            </div>
            <div className="note-footer">
                {saving ? <div className="time">Saving...</div> : <TimeAgo className="time" date={updatedAt} />}
                <MdContentCopy className="copy delete-icon" onClick={() => handleCopyNote(text)} />
            </div>
        </div>
    );
};

export default Note;
