import {nanoid} from "nanoid";

export const navItems = [
    {name: 'Quotes', id: nanoid(), route: '/quotes'},
    {name: 'Submit new quote', id: nanoid(), route: '/add-quote'},
];

export const categories = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humour', id: 'humor'},
    {title: 'Motivational', id: 'motivational'},
];