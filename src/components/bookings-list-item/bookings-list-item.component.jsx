import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faCashRegister,
    faHourglassHalf,
    faShippingFast,
    faWindowClose,
    faShoppingBag,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import UserButton from '../user-button/user-button.component';
import BOOKING_STATUSES from '../../checkout/bookingStatuses';
import './bookings-list-item.styles.scss';
import { formatFullDate } from '../../utils/formatDate';
import formatPrice from '../../utils/formatPrice';

const BookingsListItem = ({ bookingData, additionalClass, details }) => {
    const { _id, price, barcode, createdAt, history } = bookingData;
    let icon = faCheck;
    switch (history[0].description) {
        case BOOKING_STATUSES.submit:
            icon = faCheckCircle;
            break;
        case BOOKING_STATUSES.paid:
            icon = faCashRegister;
            break;
        case BOOKING_STATUSES.inProcess:
            icon = faHourglassHalf;
            break;
        case BOOKING_STATUSES.ready:
            icon = faShoppingBag;
            break;
        case BOOKING_STATUSES.cancel:
            icon = faWindowClose;
            break;
        case BOOKING_STATUSES.shipping:
            icon = faShippingFast;
            break;
        default:
            icon = faCheck;
            break;
    }
    return (
        <div className={`bookings-list-item ${additionalClass ?? ''}`}>
            <div className="bookings-list-item-container">
                <div className="bookings-list-item-wrapper">
                    <div className="bookings-list-item-icon-wrapper">
                        <p className="bookings-list-item-icon">
                            <FontAwesomeIcon icon={icon} />
                        </p>
                    </div>
                    <div className="bookings-list-item-description">
                        <div className="bookings-list-item-name">
                            <h4>{barcode}</h4>
                        </div>
                        <div className="bookings-list-item-date">
                            <p>{formatFullDate(createdAt)}</p>
                        </div>
                    </div>
                    <div className="bookings-list-item-price">
                        <h3>{formatPrice(price)}</h3>
                    </div>
                </div>
                <div className="bookings-list-item-button">
                    <UserButton
                        onClick={() => details(_id)}
                        additionalClass="bookings-list-item-details-btn"
                    >
                        Szczegóły
                    </UserButton>
                </div>
            </div>
        </div>
    );
};

export default BookingsListItem;
