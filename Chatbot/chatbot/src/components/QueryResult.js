import React from 'react';

const QueryResult = ({ queryresult }) => {
    return (
        <div className="pa2">
            <label className='white'>{queryresult}</label>
        </div>
    );
};

export default QueryResult;