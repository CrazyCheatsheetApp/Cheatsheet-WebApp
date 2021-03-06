import React, {useContext} from 'react';
import { AuthContext } from '../context';

const Header = () => {
    const { signOut } = useContext(AuthContext);
    return (
        <div className="header">           
            <h1><span className="cheat">Cheat</span> Sheet</h1>
            <button onClick={signOut} className="signOut grow">Signout</button>
        </div>
    );
};

export default Header;
