import React from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

import './checkout-btn.styles.scss';

const CheckoutBtn = ({ history }) => {
    const checkoutItems = sessionStorage.getItem('checkoutItems');
    return (
        checkoutItems > 0 && (
            <aside
                className="checkout-btn-container"
                onClick={() => history.push('/checkout')}
            >
                <span className="checkout-btn-icon">
                    <FontAwesomeIcon icon={faShoppingBag} />
                </span>
                <span className="checkout-btn-count">{checkoutItems}</span>
            </aside>
        )
    );
};

export default withRouter(CheckoutBtn);
