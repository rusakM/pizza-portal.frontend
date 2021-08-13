import React from 'react';
import { withRouter } from 'react-router';
import UserButton from '../user-button/user-button.component';

import './element-added-to-checkout.styles.scss';

const ElementAddedToCheckout = ({ confirm, history }) => (
    <div className="element-added-to-checkout">
        <div className="element-added-to-checkout-wrapper">
            <h4>Element został dodany do koszyka</h4>
            <div className="element-added-to-checkout-buttons">
                <UserButton onClick={() => confirm()}>Kupuj dalej</UserButton>
                <UserButton onClick={() => history.push('/checkout')}>
                    Idź do koszyka
                </UserButton>
            </div>
        </div>
    </div>
);

export default withRouter(ElementAddedToCheckout);
