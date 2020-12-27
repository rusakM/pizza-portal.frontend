import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './pizza-viewer-button.styles.scss';

const PizzaVieverButton = ({ addToCart }) => (
    <div className="pizza-viewer-button-container">
        <span onClick={addToCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
            &nbsp;Dodaj do koszyka
        </span>
    </div>
);

export default PizzaVieverButton;
