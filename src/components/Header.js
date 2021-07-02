import React from 'react';

const Header = ({ handleToggleDarkMode }) => {
    return (
        <div className="header">
            <h1>Code Cheat Sheets</h1>
            <button onClick={() => handleToggleDarkMode((previousDarkMode) => !previousDarkMode)} className="grow save">Toggle Mode</button>
        </div>
    )
}

export default Header;