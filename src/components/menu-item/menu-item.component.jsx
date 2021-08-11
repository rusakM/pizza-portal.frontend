import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Checkout, { CHECKOUT_CATEGORIES } from '../../checkout/checkout';
import UserButton from '../user-button/user-button.component';
import formatPrice from '../../utils/formatPrice';

import './menu-item.styles.scss';

const MenuItem = ({ item, category, open }) => {
    const photoUrl = `/uploads/${
        category === 'pizza' ? 'pizzas' : 'supplies'
    }/${item.coverPhoto}`;
    let ingredients = 'pomidory, mozzarella, oregano';
    if (category === 'pizza' && item.smallPizza.ingredients.length) {
        ingredients +=
            ', ' +
            item.smallPizza.ingredients
                .map((ingredient) => ingredient.name)
                .reduce((total, val) => total + ', ' + val);
    }
    return (
        <div className="menu-item">
            <div className="menu-item-container">
                <div className="menu-item-wrapper">
                    <div className="photo-container">
                        <img src={photoUrl} alt={item.id} />
                    </div>
                    <div className="menu-item-description-wrapper">
                        <div className="item-desc">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">
                                {formatPrice(item.price)}
                            </span>
                        </div>
                        {category === 'pizza' ? <p>{ingredients}</p> : null}
                    </div>
                </div>
                <div className="add-checkout-btn">
                    {category !== 'pizza' ? (
                        <UserButton
                            onClick={() => {
                                const checkout = new Checkout();
                                if (category === 'sosy') {
                                    checkout.addItem(
                                        item,
                                        CHECKOUT_CATEGORIES.SAUCE
                                    );
                                } else if (category === 'napoje') {
                                    checkout.addItem(
                                        item,
                                        CHECKOUT_CATEGORIES.DRINK
                                    );
                                } else {
                                    return;
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            &nbsp; Do koszyka
                        </UserButton>
                    ) : (
                        <UserButton
                            onClick={() => open(item.name.toLowerCase())}
                        >
                            Sprawdź
                        </UserButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
