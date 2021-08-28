import React from 'react';
import './Quote.css';

const Quote = ({text, author, onRemove, onEdit}) => {
    return (
        <div className="Quote">
            <p>{`" ${text} "`}</p>
            <p>{' - ' + author}</p>
            <div>
                <button
                    onClick={onEdit}
                >
                    Edit
                </button>
                <button
                    onClick={onRemove}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Quote;