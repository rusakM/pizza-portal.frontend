import React from 'react';
import CheckoutItem from '../checkout-item/checkout-item.component';
import './checkout-items-list.styles.scss';
import { CHECKOUT_CATEGORIES_NAMES } from '../../checkout/checkout';

const CheckoutItemsList = ({ category, items, add, remove, clear }) => {
    return (
        <div className="checkout-items-list">
            <h3>{CHECKOUT_CATEGORIES_NAMES[category]}:</h3>
            {items.map((item) => (
                <CheckoutItem
                    item={item}
                    category={category}
                    add={add}
                    remove={remove}
                    clear={clear}
                    key={item._id}
                />
            ))}
        </div>
    );
};

export default CheckoutItemsList;
