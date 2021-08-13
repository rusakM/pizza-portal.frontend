import React from 'react';
import AccountList from '../../components/account-list/account-list.component';
import AccountListMobile from '../../components/account-list-mobile/account-list-mobile.component';
import AccountDirectory from '../../components/account-directory/account-directory.component';
import CheckoutBtn from '../../components/checkout-btn/checkout-btn.component';
import CustomAlert from '../../components/custom-alert/custom-alert.component';
import ElementAddedToCheckout from '../../components/element-added-to-checkout/element-added-to-checkout.component';
import './account.styles.scss';

class AccountViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            addedElementPopup: false,
        };
    }

    togglePopup = () => {
        this.setState({
            addedElementPopup: !this.state.addedElementPopup,
        });
    };

    render() {
        const { pathname } = this.props.history.location;
        const { addedElementPopup } = this.state;
        return (
            <div className="account-viewer">
                <div className="account-viewer-container">
                    <AccountList activeElement={pathname} />
                    <AccountListMobile activeElement={pathname} />
                    <AccountDirectory
                        componentName={pathname}
                        togglePopup={this.togglePopup}
                    />
                </div>
                {addedElementPopup && (
                    <CustomAlert>
                        <ElementAddedToCheckout confirm={this.togglePopup} />
                    </CustomAlert>
                )}
                <CheckoutBtn />
            </div>
        );
    }
}

export default AccountViewer;
