import {nanoid} from "nanoid";

export const navItems = [
    {name: 'Quotes', id: nanoid(), route: '/quotes'},
    {name: 'Submit new quote', id: nanoid(), route: '/add-quote'},
];
