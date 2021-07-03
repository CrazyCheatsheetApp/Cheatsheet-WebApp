import { MdDeleteForever } from 'react-icons/md';
import TimeAgo from 'react-timeago';

const Note = ({ id, text, date, handleDeleteNote }) => {
    return (
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>
                    <TimeAgo date={date} />
                </small>
                <small></small>
                <MdDeleteForever onClick={() => handleDeleteNote(id)} className="grow delete-icon" size="1.3em" />
            </div>
        </div>
    );
};

export default Note;
