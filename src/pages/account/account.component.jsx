import React from 'react';
import { withRouter } from 'react-router-dom';
import LIST_DATA from '../../components/account-list/account-list.data';
import AccountList from '../../components/account-list/account-list.component';
import AccountListMobile from '../../components/account-list-mobile/account-list-mobile.component';
import AccountDirectory from '../../components/account-directory/account-directory.component';

import './account.styles.scss';

class AccountViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
        };
    }

    render() {
        const { pathname } = this.props.history.location;

        return (
            <div className="account-viewer">
                <div className="account-viewer-container">
                    <AccountList activeElement={pathname} />
                    <AccountListMobile activeElement={pathname} />
                    <AccountDirectory componentName={pathname} />
                </div>
            </div>
        );
    }
}

export default AccountViewer;
