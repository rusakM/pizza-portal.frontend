import React from 'react';
import LIST_DATA from '../account-list/account-list.data';
import Settings from '../settings/settings.component';
import AddressViewer from '../address-viewer/address-viewer.component';
import ChangePassword from '../change-password/change-password.component';
import MyPizzas from '../my-pizzas/my-pizzas.component';
import './account-directory.styles.scss';

const AccountDirectory = ({ componentName }) => {
    let Component;
    switch (componentName) {
        case LIST_DATA[0].link:
            Component = <Settings />;
            break;
        case LIST_DATA[2].link:
            Component = <MyPizzas />;
            break;
        case LIST_DATA[3].link:
            Component = <AddressViewer />;
            break;
        case LIST_DATA[4].link:
            Component = <ChangePassword />;
            break;
        default:
            Component = <Settings />;
            break;
    }

    return <div className="account-directory">{Component}</div>;
};

export default AccountDirectory;
