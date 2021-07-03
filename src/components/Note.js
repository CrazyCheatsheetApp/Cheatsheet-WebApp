import { MdDeleteForever } from 'react-icons/md';
import dateFormat from 'dateformat';

const Note = ({ id, text, date, handleDeleteNote }) => {
    return (
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>{dateFormat(date)}</small>
                <MdDeleteForever onClick={() => handleDeleteNote(id)} className="grow delete-icon" size="1.3em" />
            </div>
        </div>
    );
};

export default Note;
