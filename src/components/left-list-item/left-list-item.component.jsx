import React from 'react';

import './left-list-item.styles.scss';

const LeftListItem = ({ children, link, isActive, category }) => {
    return (
        <li className={`left-list-item ${isActive && 'active-list-item'}`}>
            <span onClick={() => link(category)}>{children}</span>
        </li>
    );
};

export default LeftListItem;
