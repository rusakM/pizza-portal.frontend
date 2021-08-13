import React from 'react';
import LIST_DATA from '../../utils/account-list.data';
import Settings from '../settings/settings.component';
import AddressViewer from '../address-viewer/address-viewer.component';
import ChangePassword from '../change-password/change-password.component';
import MyPizzas from '../my-pizzas/my-pizzas.component';
import Bookings from '../bookings/bookings.component';
import './account-directory.styles.scss';

const AccountDirectory = ({ componentName, togglePopup }) => {
    let Component;
    switch (componentName) {
        case LIST_DATA[0].link:
            Component = <Settings />;
            break;
        case LIST_DATA[1].link:
            Component = <Bookings />;
            break;
        case LIST_DATA[2].link:
            Component = <MyPizzas togglePopup={togglePopup} />;
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
