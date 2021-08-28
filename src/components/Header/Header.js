import React from 'react';
import {NavLink} from "react-router-dom";

import {navItems} from "../../constants";
import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="HeaderInner Container">
                <NavLink
                    to='/'
                    className="Logo"
                >
                    <b>Quotes Central</b>
                </NavLink>
                <ul className="NavList">
                    {navItems.map(item => (
                        <li key={item.id} className="NavItem">
                            <NavLink
                                to={item.route}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Header;