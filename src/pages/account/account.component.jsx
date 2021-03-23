import React from 'react';
import { withRouter } from 'react-router-dom';
import LIST_DATA from '../../components/account-list/account-list.data';
import AccoutList from '../../components/account-list/account-list.component';
import AccountDirectory from '../../components/account-directory/account-directory.component';

import './account.styles.scss';
import AccountList from '../../components/account-list/account-list.component';

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
                    <AccountDirectory componentName={pathname} />
                </div>
            </div>
        );
    }
}

export default AccountViewer;
