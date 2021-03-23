import React from 'react';

import './account-list-item.styles.scss';

const AccountListItem = ({ children, link, isActive }) => {
    isActive = isActive ? 'active-list-item' : '';
    return (
        <li className={`account-list-item ${isActive}`}>
            <a href={link}>{children}</a>
        </li>
    );
};

export default AccountListItem;
