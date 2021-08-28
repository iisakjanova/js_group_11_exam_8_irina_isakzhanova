import React, {useEffect, useState} from 'react';
import {useRouteMatch} from 'react-router-dom'
import axiosApi from "../../axiosApi";

import Spinner from "../UI/Spinner/Spinner";
import Quote from "../Quote/Quote";

import {categories} from '../../constants.js'

const QuotesList = () => {
    const match = useRouteMatch("/quotes/:category");
    const selectedCategory = match?.params.category;
    let categoryData = {title: 'All'};

    if (selectedCategory) {
        categoryData = categories.find(item => item.id === selectedCategory);
    }

    const [quotes, setQuotes] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const quotes = await getQuotes();
                setQuotes(quotes);
            } finally {
                setLoading(false);
            }
        })();
    }, [selectedCategory]);

    const getQuotes = async () => {
        let response;

        if (selectedCategory) {
            response = await axiosApi.get(`/quotes.json?orderBy="category"&equalTo="${selectedCategory}"`);
        } else {
            response = await axiosApi.get(`/quotes.json`);
        }

        return response.data;
    };

    const removeQuote = async id => {
        setLoading(true);

        try {
            await axiosApi.delete('quotes/' + id + '.json');
            const {[id]: _, ...restQuotes} = quotes;
            setQuotes(restQuotes);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="QuotesList">
            {loading
                ?
                <Spinner />
                :
                quotes
                    ?
                    <div>
                        <h4>{categoryData.title}</h4>
                        {Object.keys(quotes).map(key => (
                            <Quote
                                key={key}
                                text={quotes[key].text}
                                author={quotes[key].author}
                                onRemove={() => removeQuote(key)}
                            />
                        ))}
                    </div>
                    :
                    null
            }
        </div>
    );
};

export default QuotesList;