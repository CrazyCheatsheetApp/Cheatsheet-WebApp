import autosize from 'autosize';
import { useEffect, useRef, useState } from 'react';
import { MdClose, MdContentCopy } from 'react-icons/md';
import TimeAgo from 'react-timeago';

const Note = ({ id, text, date, handleDeleteNote, handleCopyNote, handleUpdate }) => {
    const [content, setContent] = useState(text);
    const [saving, setSaving] = useState(false);
    const ref = useRef();

    const handleChange = (e) => {
        let value = e.target.value;
        setContent(value);

        handleUpdate({
            id,
            text: value
        });
    };

    useEffect(() => {
        autosize(ref.current);
    });

    useEffect(() => {
        setSaving(text !== content);
    }, [text, content]);

    return (
        <div className="note grow-note">
            <div className="note-header">
                <textarea ref={ref} value={content} onChange={handleChange}></textarea>
                <MdClose onClick={() => handleDeleteNote(id)} className="delete-icon" size="1.3em" />
            </div>
            <div className="note-footer">
                {saving ? <div className="time">Saving...</div> : <TimeAgo className="time" date={date} />}
                <MdContentCopy size="2em" className="copy delete-icon" onClick={() => handleCopyNote(content)} />
            </div>
        </div>
    );
};

export default Note;
