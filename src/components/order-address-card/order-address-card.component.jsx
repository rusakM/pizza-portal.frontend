import React from 'react';
import UserButton from '../user-button/user-button.component';

import './order-address-card.styles.scss';

const OrderAddressCard = ({ addressData, choose, isChosen, addressId }) => {
    const cls = isChosen
        ? 'address-card-wrapper address-card-chosen'
        : 'address-card-wrapper';
    return (
        <div className="address-card">
            <div className={cls}>
                <p>{addressData.user.name}</p>
                <p>
                    {addressData.street} {addressData.houseNumber}
                    {addressData.flatNumber && ` / ${addressData.flatNumber}`}
                </p>
                <p>
                    {addressData.zipCode} {addressData.city}
                </p>
                <p>{addressData.phoneNumber}</p>
            </div>
            {!isChosen && (
                <UserButton onClick={() => choose(addressId)}>
                    Wybierz
                </UserButton>
            )}
        </div>
    );
};

export default OrderAddressCard;
