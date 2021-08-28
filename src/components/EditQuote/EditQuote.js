import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

import Spinner from "../UI/Spinner/Spinner";
import {categories} from "../../constants";

import "./EditQuote.css";

const EditQuote = () => {
    const history = useHistory();

    const [quote, setQuote] = useState({
        category: history.location.state?.category || 'star-wars',
        author: history.location.state?.author || '',
        text: history.location.state?.text || ''
    });

    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState('');

    const handleFieldChange = e => {
        const {name, value} = e.target;
        setQuote(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = () => {

    }

    return (
        <div className="EditQuoteForm">
            {loading
                ?
                <Spinner />
                :
                <form onSubmit={handleFormSubmit}>
                    <label>
                        <p>Category</p>
                        <select
                            name="category"
                            onChange={handleFieldChange}
                        >
                            {categories.map(category => (
                                <option
                                    value={category.id}
                                    key={category.id}
                                >
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <p>Title</p>
                        <input
                            type="text"
                            name="author"
                            value={quote.author}
                            onChange={handleFieldChange}
                        />
                    </label>
                    <label>
                        <p>Description</p>
                        <textarea
                            name="text"
                            value={quote.text}
                            onChange={handleFieldChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
            }
            <p className="FieldError">{fieldError}</p>
        </div>
    );
};

export default EditQuote;