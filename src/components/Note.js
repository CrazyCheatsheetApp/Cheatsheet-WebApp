import { MdClose } from 'react-icons/md';
import TimeAgo from 'react-timeago';

const Note = ({ id, text, date, handleDeleteNote }) => {
    return (
        <div className="note grow-note">
            <div className="note-header">
                <span>{text}</span>
                <MdClose onClick={() => handleDeleteNote(id)} className="grow-delete delete-icon" size="1.3em" />
            </div>
            <div className="note-footer">
                <small>
                    <TimeAgo date={date} />
                </small>   
            </div>
        </div>
    );
};

export default Note;
