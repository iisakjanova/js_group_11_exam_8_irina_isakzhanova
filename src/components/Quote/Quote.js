import React from 'react';
import './Quote.css';

const Quote = ({text,author}) => {
    return (
        <div className="Quote">
            <p>{`" ${text} "`}</p>
            <p>{' - ' + author}</p>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default Quote;