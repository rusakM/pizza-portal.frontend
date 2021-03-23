import React from 'react';
import LIST_DATA from '../account-list/account-list.data';
import Settings from '../settings/settings.component';
import './account-directory.styles.scss';

const AccountDirectory = ({ componentName }) => {
    let Component;
    switch (componentName) {
        case LIST_DATA[0].link:
            Component = <Settings />;
            break;
        default:
            Component = <Settings />;
            break;
    }

    return <div className="account-directory">{Component}</div>;
};

export default AccountDirectory;
