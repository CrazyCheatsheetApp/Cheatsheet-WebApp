import { MdClose } from 'react-icons/md';
import { MdContentCopy } from 'react-icons/md';
import TimeAgo from 'react-timeago';

const Note = ({ id, text, date, handleDeleteNote, handleCopyNote }) => {
    return (
        <div className="note grow-note">
            <div className="note-header">
                <span>{text}</span>
                <MdClose onClick={() => handleDeleteNote(id)} className="delete-icon" size="1.3em" />
            </div>
            <div className="note-footer">
                    <TimeAgo className="time" date={date} />
                    <MdContentCopy className="copy delete-icon" onClick={() => handleCopyNote(text)}/>
            </div>
        </div>
    );
};

export default Note;
