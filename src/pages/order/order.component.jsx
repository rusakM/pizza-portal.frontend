import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Checkout from '../../checkout/checkout';
import UserButton from '../../components/user-button/user-button.component';
import OrderAddressCard from '../../components/order-address-card/order-address-card.component';
import CustomAlert from '../../components/custom-alert/custom-alert.component';
import AddressCard from '../../components/address-card/address-card.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';
import EMPTY_ADDRESS from '../../utils/emptyAddress';
import formatPrice from '../../utils/formatPrice';
import { stripePk } from '../../config';

import './order.styles.scss';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: null,
            isTakeAway: false,
            isWithDelivery: false,
            isPayNow: true,
            addresses: [],
            checkout: new Checkout(),
            selectedAddressId: 0,
            isCreatingAddress: false,
            isBookingProcessing: false,
        };
    }

    async componentDidMount() {
        try {
            let addresses = await axios({
                method: 'GET',
                url: '/api/users/getMyAddress',
            });
            addresses = addresses.data.data.data;
            if (addresses.length > 0) {
                let selectedAddressId = 0;
                for (let i = 0; i < addresses.length; i++) {
                    if (addresses[i].isDefault) {
                        selectedAddressId = i;
                        break;
                    }
                }
                this.setState({
                    addresses,
                    selectedAddressId,
                });
            }
        } catch (error) {}
    }
    toggleIsTakeAway = (isTakeAway) => {
        this.setState({
            isTakeAway,
            isWithDelivery: false,
            deliveryAddress: null,
        });
    };
    changeHandler = (field, value) => {
        this.setState({ [field]: value });
    };

    selectAddress = (id) => {
        this.setState({
            selectedAddressId: id,
        });
    };

    order = async () => {
        const {
            addresses,
            selectedAddressId,
            isWithDelivery,
            isTakeAway,
            isPayNow,
        } = this.state;
        const bookingData = this.state.checkout.createBooking(
            isWithDelivery ? addresses[selectedAddressId] : null,
            isWithDelivery,
            isTakeAway,
            isPayNow
        );
        this.setState({ isBookingProcessing: true }, async () => {
            this.processOrder(bookingData);
        });
    };

    processOrder = async (bookingData) => {
        const { isPayNow, checkout } = this.state;

        if (checkout.checkoutItems === 0) {
            return;
        }
        try {
            const booking = await axios({
                method: 'POST',
                url: '/api/bookings',
                data: {
                    ...bookingData,
                },
            });
            checkout.clearCheckout();

            if (!isPayNow) {
                this.props.history.push(
                    `/booking-complete/${booking.data.data.data._id}`
                );
            } else {
                const stripe = await loadStripe(stripePk);
                checkout.clearCheckout();
                stripe.redirectToCheckout({
                    sessionId: booking.data.session.id,
                });
            }
        } catch (error) {
            this.setState({ isBookingProcessing: false });
        }
    };

    cancelAddress = () => {
        this.setState({
            isCreatingAddress: false,
        });
    };

    createAddress = async (addressData) => {
        try {
            let address = await axios({
                url: '/api/address',
                method: 'POST',
                data: addressData,
            });
            address = address.data.data.data;
            const { addresses } = this.state;
            addresses.unshift(address);
            this.setState({
                addresses,
                isCreatingAddress: false,
                selectedAddressId: 0,
            });
        } catch (error) {
            this.setState({
                isCreatingAddress: false,
            });
        }
    };

    render() {
        const inRestaurantCls = this.state.isTakeAway
            ? 'form-btn white-btn'
            : 'form-btn';
        const takeAwayCls = this.state.isTakeAway
            ? 'form-btn'
            : 'form-btn white-btn';
        const deliveryCls = this.state.isWithDelivery
            ? 'form-btn'
            : 'form-btn white-btn';
        const pickupCls = this.state.isWithDelivery
            ? 'form-btn white-btn'
            : 'form-btn';
        const payNowCls = this.state.isPayNow
            ? 'form-btn'
            : 'form-btn white-btn';
        const payWithDelivery = this.state.isPayNow
            ? 'form-btn white-btn'
            : 'form-btn';
        return (
            <div className="order-viewer">
                <div className="order-viewer-container">
                    <div className="order-viewer-header">
                        <span
                            className="back-btn"
                            onClick={() => this.props.history.goBack()}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                        <h2>Szczegóły zamówienia:</h2>
                    </div>
                    <div className="order-viewer-form">
                        <div className="form-row">
                            <p>Wybierz rodzaj zamówienia:</p>
                            <div className="form-row-wrapper">
                                <UserButton
                                    additionalClass={inRestaurantCls}
                                    onClick={() => this.toggleIsTakeAway(false)}
                                >
                                    Na miejscu
                                </UserButton>
                                <UserButton
                                    additionalClass={takeAwayCls}
                                    onClick={() => this.toggleIsTakeAway(true)}
                                >
                                    Na wynos
                                </UserButton>
                            </div>
                        </div>
                        {this.state.isTakeAway && (
                            <div className="form-row">
                                <p>Wybierz sposób odbioru:</p>
                                <div className="form-row-wrapper">
                                    <UserButton
                                        additionalClass={pickupCls}
                                        onClick={() =>
                                            this.changeHandler(
                                                'isWithDelivery',
                                                false
                                            )
                                        }
                                    >
                                        Odbiór osobisty
                                    </UserButton>
                                    <UserButton
                                        additionalClass={deliveryCls}
                                        onClick={() =>
                                            this.changeHandler(
                                                'isWithDelivery',
                                                true
                                            )
                                        }
                                    >
                                        Dostawa do domu
                                    </UserButton>
                                </div>
                            </div>
                        )}
                        {this.state.isTakeAway && this.state.isWithDelivery && (
                            <div className="form-row">
                                <p>Adres dostawy:</p>
                                <div className="form-row-wrapper">
                                    <div className="order-address-list">
                                        <div className="order-address-card">
                                            <div className="order-address-card-wrapper ">
                                                <span
                                                    className="address-new"
                                                    onClick={() =>
                                                        this.changeHandler(
                                                            'isCreatingAddress',
                                                            true
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPlusCircle}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        {this.state.addresses.length > 0 &&
                                            this.state.addresses.map(
                                                (address, i) => (
                                                    <OrderAddressCard
                                                        addressData={address}
                                                        choose={
                                                            this.selectAddress
                                                        }
                                                        isChosen={
                                                            i ===
                                                            this.state
                                                                .selectedAddressId
                                                        }
                                                        addressId={i}
                                                        key={i}
                                                    />
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="form-row">
                            <p>Sposób płatności:</p>
                            <div className="form-row-wrapper">
                                <UserButton
                                    additionalClass={payNowCls}
                                    onClick={() =>
                                        this.changeHandler('isPayNow', true)
                                    }
                                >
                                    Online
                                </UserButton>
                                <UserButton
                                    additionalClass={payWithDelivery}
                                    onClick={() =>
                                        this.changeHandler('isPayNow', false)
                                    }
                                >
                                    Przy odbiorze
                                </UserButton>
                            </div>
                        </div>
                        <div className="form-row">
                            <h3>
                                Wartość zamówienia:&nbsp;
                                {formatPrice(
                                    this.state.checkout.getCheckoutValue()
                                )}
                            </h3>
                        </div>
                        <div className="form-row">
                            <div className="form-row-wrapper">
                                <UserButton onClick={this.order}>
                                    Zamów
                                </UserButton>
                            </div>
                        </div>
                    </div>
                    {this.state.isCreatingAddress && (
                        <CustomAlert>
                            <AddressCard
                                address={EMPTY_ADDRESS}
                                cancel={this.cancelAddress}
                                save={this.createAddress}
                                isEditing={true}
                            />
                        </CustomAlert>
                    )}
                    {this.state.isBookingProcessing && (
                        <LoadingScreen>
                            Przetwarzanie zamówienia...
                        </LoadingScreen>
                    )}
                </div>
            </div>
        );
    }
}

export default Order;
