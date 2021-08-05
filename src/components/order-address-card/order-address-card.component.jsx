import React from 'react';

import './order-address-card.styles.scss';

const OrderAddressCard = ({ addressData, choose, isChosen, addressId }) => {
    const cls = isChosen
        ? 'order-address-card-wrapper order-address-card-chosen'
        : 'order-address-card-wrapper';
    return (
        <div className="order-address-card" onClick={() => choose(addressId)}>
            <div className={cls}>
                <p>
                    {addressData.street} {addressData.houseNumber}
                    {addressData.flatNumber && ` / ${addressData.flatNumber}`}
                </p>
                <p>
                    {addressData.zipCode} {addressData.city}
                </p>
                <p>{addressData.phoneNumber}</p>
            </div>
        </div>
    );
};

export default OrderAddressCard;
