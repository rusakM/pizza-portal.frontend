import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CHECKOUT_CATEGORIES } from '../../checkout/checkout';
import PizzaPreviewBox from '../pizza-preview-box/pizza-preview-box.component';
import './checkout-item.styles.scss';

const CheckoutItem = ({ item, category, add, remove, clear }) => {
    const productType =
        category === CHECKOUT_CATEGORIES.PIZZA ||
        category === CHECKOUT_CATEGORIES.OWN_PIZZA
            ? 'pizzas'
            : 'supplies';
    const coverPhoto =
        category === CHECKOUT_CATEGORIES.OWN_PIZZA
            ? null
            : category === CHECKOUT_CATEGORIES.PIZZA
            ? item.template.coverPhoto
            : item.coverPhoto;
    const productName =
        category === CHECKOUT_CATEGORIES.OWN_PIZZA
            ? null
            : category === CHECKOUT_CATEGORIES.PIZZA
            ? `${item.template.name} ${item.size}cm`
            : item.name;
    const defaultIngredients = 'Sos pomidorowy, mozzarella, oregano';
    const productDescription =
        productType === 'pizzas'
            ? item.ingredients.length > 0
                ? `${defaultIngredients}, ` +
                  item.ingredients
                      .map((item) => item.name)
                      .reduce((total, val) => total + `, ${val}`)
                : defaultIngredients
            : null;

    return (
        <div className="checkout-item">
            <div className="checkout-item-content">
                {category !== CHECKOUT_CATEGORIES.OWN_PIZZA && (
                    <img
                        src={`/uploads/${productType}/${coverPhoto}`}
                        alt={`item-${item._id}`}
                    />
                )}
                {category === CHECKOUT_CATEGORIES.OWN_PIZZA && (
                    <PizzaPreviewBox
                        ingredientsList={item.ingredients}
                        imgPath="pizza-creator-thumbnails"
                        imgClass="ingredient-thumbnail"
                        defaultImgClass="default-img-thumbnail"
                    />
                )}
                <div className="checkout-item-description">
                    {category !== CHECKOUT_CATEGORIES.OWN_PIZZA && (
                        <h4>{productName}</h4>
                    )}
                    {productType === 'pizzas' && (
                        <span>{productDescription}</span>
                    )}
                </div>
            </div>
            <div className="checkout-item-buttons">
                <span
                    className="checkout-btn"
                    onClick={() => {
                        remove(item._id, category);
                    }}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </span>
                <span className="checkout-items-count">{item.count}</span>
                <span
                    className="checkout-btn"
                    onClick={() => {
                        add(item, category);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </span>
            </div>
            <span
                className="checkout-btn-remove"
                onClick={() => {
                    clear(item._id, category);
                }}
            >
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </div>
    );
};

export default CheckoutItem;
