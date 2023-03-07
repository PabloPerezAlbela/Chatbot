import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchChange, onSend, onRestart }) => {
    return (
        <div className="pa2">
            <input
                className="pa3 ba b--green bg-lightest-blue"
                type="search"
                placeholder="ingrese texto"
                onChange={searchChange}
            />
            <a onClick={onSend} className="f6 link dim ph3 pv2 mb2 dib white" href="#0">Enviar</a>
            <a onClick={onRestart} className="f6 link dim ph3 pv2 mb2 dib white" href="#0">Restart</a>
        </div>
    );
};

export default SearchBox;