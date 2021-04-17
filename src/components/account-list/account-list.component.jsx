import React from 'react';

import AccountListItem from '../account-list-item/account-list-item.component';
import ACCOUNT_LIST_DATA from './account-list.data';
import './account-list.styles.scss';
import './account-list-desktop.styles.scss';

const AccountList = ({ activeElement }) => {
    return (
        <div className="account-list account-list-desktop">
            <ul>
                {ACCOUNT_LIST_DATA.map(({ link, name }, i) => (
                    <AccountListItem
                        link={link}
                        key={i}
                        isActive={activeElement === link ? true : false}
                    >
                        {name}
                    </AccountListItem>
                ))}
            </ul>
        </div>
    );
};

export default AccountList;
