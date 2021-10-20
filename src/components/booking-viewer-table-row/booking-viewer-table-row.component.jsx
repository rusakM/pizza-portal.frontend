import React from 'react';

import PizzaPreviewBox from '../pizza-preview-box/pizza-preview-box.component';
import { CHECKOUT_CATEGORIES as CATS } from '../../checkout/checkout';
import formatPrice from '../../utils/formatPrice';
import './booking-viewer-table-row.styles.scss';

const BookingViewerTableRow = ({ itemData, category }) => {
    const { _id, name, price, quantity, totalAmount } = itemData;
    const categoryType =
        category === CATS.DRINK || category === CATS.SAUCE
            ? 'products'
            : category;
    let coverPhoto = (
        <img
            src={`/uploads/${categoryType}/${itemData.coverPhoto}`}
            className="booking-viewer-table-row-photo-img"
            alt={name}
        />
    );
    let href = `/pizza-creator/${_id}`;

    if (category === CATS.OWN_PIZZA) {
        coverPhoto = (
            <PizzaPreviewBox
                ingredientsList={itemData.ingredients}
                imgPath="pizza-creator-thumbnails"
                imgClass="ingredient-thumbnail"
                defaultImgClass="default-img-thumbnail"
            />
        );
    }

    if (category === CATS.PIZZA) {
        href = `/menu/pizza/${itemData.slug}`;
    }

    return (
        <div className="booking-viewer-table-row">
            <div className="booking-viewer-table-row-wrapper">
                <div className="booking-viewer-table-row-left">
                    <div className="booking-viewer-table-row-photo">
                        {coverPhoto}
                    </div>
                    <div className="booking-viewer-table-row-name">
                        {(category === CATS.PIZZA ||
                            category === CATS.OWN_PIZZA) && (
                            <div className="booking-viewer-table-row-name-wrapper">
                                <h4>
                                    <a href={href}>{name}</a>
                                </h4>
                                <p>{itemData.description}</p>
                            </div>
                        )}
                        {(category === CATS.DRINK ||
                            category === CATS.SAUCE) && (
                            <div className="booking-viewer-table-row-name-wrapper">
                                <h4>{name}</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="booking-viewer-table-row-right">
                    <div className="booking-viewer-table-row-field">
                        <h5>
                            Ilość:
                            <br /> {quantity}
                        </h5>
                    </div>
                    <div className="booking-viewer-table-row-field">
                        <h5>
                            Cena (szt):
                            <br /> {formatPrice(price)}
                        </h5>
                    </div>
                    <div className="booking-viewer-table-row-field">
                        <h5>
                            Razem:
                            <br /> {formatPrice(totalAmount)}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingViewerTableRow;
