import React from 'react';

import AccountListItem from '../account-list-item/account-list-item.component';
import ACCOUNT_LIST_DATA from './account-list.data';
import './account-list.styles.scss';

const AccountList = ({ activeElement }) => {
    return (
        <div className="account-list">
            <ul>
                {ACCOUNT_LIST_DATA.map((item, i) => (
                    <AccountListItem
                        link={item.link}
                        key={i}
                        isActive={activeElement === item.link ? true : false}
                    >
                        {item.name}
                    </AccountListItem>
                ))}
            </ul>
        </div>
    );
};

export default AccountList;
