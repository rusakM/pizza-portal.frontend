import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faShoppingCart,
    faPlus,
    faEdit,
} from '@fortawesome/free-solid-svg-icons';
import PizzaPreviewBox from '../pizza-preview-box/pizza-preview-box.component';
import UserButton from '../user-button/user-button.component';

import './pizza-list-row.styles.scss';

const PizzaListRow = ({ pizza, remove, addToCart, edit }) => (
    <div className="pizza-list-row">
        <PizzaPreviewBox
            ingredientsList={pizza.ingredients}
            imgPath="pizza-creator-thumbnails"
            imgClass="ingredient-thumbnail"
            defaultImgClass="default-img-thumbnail"
        />
        <div className="pizza-list-row-wrapper">
            <div className="pizza-list-row-ingredients">
                {pizza.ingredients.map((item) => item.name + ', ').join('') +
                    'mozzarella, oregano, sos pomidowowy'}
            </div>
            <div className="pizza-list-row-buttons">
                <UserButton
                    onClick={() => {
                        edit(pizza._id);
                    }}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </UserButton>
                <UserButton
                    onClick={() => {
                        addToCart(pizza);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <FontAwesomeIcon icon={faShoppingCart} />
                </UserButton>
                <UserButton
                    onClick={() => {
                        remove(pizza._id);
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </UserButton>
            </div>
        </div>
    </div>
);

export default PizzaListRow;
