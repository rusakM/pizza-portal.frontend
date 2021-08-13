import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ACCOUNT_LIST_DATA from '../../utils/account-list.data';
import AccountListItem from '../account-list-item/account-list-item.component';

import './account-list-mobile.styles.scss';

const AccountListMobile = ({ activeElement }) => {
    return (
        <div className="account-list account-list-mobile">
            <ul>
                {ACCOUNT_LIST_DATA.map(({ link, icon }, i) => (
                    <AccountListItem
                        link={link}
                        key={i}
                        isActive={activeElement === link ? true : false}
                    >
                        <FontAwesomeIcon icon={icon} />
                    </AccountListItem>
                ))}
            </ul>
        </div>
    );
};

export default AccountListMobile;
