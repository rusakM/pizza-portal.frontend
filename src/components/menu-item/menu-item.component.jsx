import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { uploadsUrl } from '../../config';

import './menu-item.styles.scss';

const MenuItem = ({ item, category, addItemToCheckout }) => {
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
                <div className="photo-container">
                    <img src={photoUrl} alt={item.id} />
                </div>
                <div className="item-desc">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{item.price + ' zł'}</span>
                </div>
                {category === 'pizza' ? <p>{ingredients}</p> : null}
                {category !== 'pizza' ? (
                    <span
                        className="add-checkout-btn"
                        onClick={() => addItemToCheckout(item.id, 'products')}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} />
                        &nbsp;Do koszyka
                    </span>
                ) : (
                    <span className="add-checkout-btn">
                        <a href={`/menu/pizza/${item.name.toLowerCase()}`}>
                            Sprawdź
                        </a>
                    </span>
                )}
            </div>
        </div>
    );
};

export default MenuItem;
