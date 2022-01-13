import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Checkout, { CHECKOUT_CATEGORIES } from '../../checkout/checkout';
import CheckoutItemsList from '../../components/checkout-items-list/checkout-items-list.component';
import BookingBtn from '../../components/booking-btn/booking-btn.component';
import formatPrice from '../../utils/formatPrice';

import './checkout-viewer.styles.scss';

class CheckoutViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkout: new Checkout(),
        };
    }

    add = (item, category) => {
        const { checkout } = this.state;
        checkout.addItem(item, category);
        this.setState({
            checkout,
        });
    };

    remove = (id, category) => {
        const { checkout } = this.state;
        checkout.removeItem(id, category);
        this.setState({ checkout });
    };

    clear = (id, category) => {
        const { checkout } = this.state;
        checkout.clearItem(id, category);
        this.setState({ checkout });
    };

    render() {
        const checkout = this.state.checkout.checkout;
        return (
            <div className="checkout-viewer">
                <div className="checkout-viewer-container">
                    <div className="checkout-viewer-header">
                        <span
                            className="back-btn"
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                        <h2>Twoje zamówienie:</h2>
                    </div>
                    <div className="checkout">
                        {Object.values(CHECKOUT_CATEGORIES).map((item) =>
                            checkout[item] && checkout[item].length ? (
                                <CheckoutItemsList
                                    items={this.state.checkout.checkout[item]}
                                    add={this.add}
                                    remove={this.remove}
                                    clear={this.clear}
                                    category={item}
                                    key={item}
                                />
                            ) : null
                        )}
                    </div>
                    <div className="summary">
                        <p>
                            <b>
                                Wartość twojego koszyka:&nbsp;
                                {formatPrice(
                                    this.state.checkout.getCheckoutValue()
                                )}
                            </b>
                        </p>
                    </div>
                    <BookingBtn link="/order">Przejdź do zamówienia</BookingBtn>
                </div>
            </div>
        );
    }
}

export default CheckoutViewer;
