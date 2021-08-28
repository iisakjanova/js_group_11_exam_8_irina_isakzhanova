import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axiosApi from "../../axiosApi";

import Spinner from "../UI/Spinner/Spinner";
import {categories} from "../../constants";

import "./EditQuote.css";

const EditQuote = ({match}) => {
    const history = useHistory();

    const isNew = !Boolean(match.params.id);

    useEffect(() => {
        if (isNew) {
            setQuote({
                category: categories[0].id,
                author: '',
                text: ''
            });
        }
    }, [isNew]);

    const [quote, setQuote] = useState({
        category: history.location.state?.category || categories[0].id,
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

    const sendCreateQuoteRequest = async () => {
        await axiosApi.post('/quotes.json', {
            category: quote.category,
            author: quote.author,
            text: quote.text
        });
    };

    const sendUpdateQuoteRequest = async () => {
        await axiosApi.put('quotes/' + history.location.state?.id + '.json', {
            category: quote.category,
            author: quote.author,
            text: quote.text
        });
    };

    const createQuote = async () => {
        try {
            if (quote.category && quote.author && quote.text) {
                await sendCreateQuoteRequest();

                setQuote({
                    category: categories[0].id,
                    author: '',
                    text: ''
                });

                setFieldError('');
                history.replace('/');
            } else {
                setFieldError('* Fill all the fields, please!');
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateQuote = async () => {
        try {
            if (quote.category && quote.author && quote.text) {
                await sendUpdateQuoteRequest();
                setFieldError('');
            } else {
                setFieldError('* Fill all the fields, please!');
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        if (history.location.state?.id) {
            await updateQuote();
        } else {
            await createQuote();
        }
    };

    let title = '';

    if (!isNew) {
        title = 'Edit a quote';
    } else {
        title = 'Submit a new quote';
    }

    return (
        <div className="EditQuoteForm">
            {loading
                ?
                <Spinner />
                :
                <div className="Container">
                    <h3>{title}</h3>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            <p>Category</p>
                            <select
                                value={quote.category}
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
                </div>
            }
                <p className="FieldError">{fieldError}</p>
        </div>
    );
};

export default EditQuote;