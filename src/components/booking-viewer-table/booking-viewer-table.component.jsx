import React from 'react';
import BookingViewerTableRow from '../booking-viewer-table-row/booking-viewer-table-row.component';
import { CHECKOUT_CATEGORIES as CATS } from '../../checkout/checkout';
import { CHECKOUT_CATEGORIES_NAMES } from '../../checkout/checkout';
import formatPrice from '../../utils/formatPrice';
import './booking-viewer-table.styles.scss';

const BookingViewerTable = ({ products, price, isFinished }) => (
    <div className="booking-viewer-table">
        {isFinished && (
            <div className="booking-viewer-table-finished">
                <h4>Zamówienie ukończone</h4>
            </div>
        )}
        <div className="booking-viewer-table-wrapper">
            {Object.values(CATS).map((category) => {
                if (products[category].length > 0) {
                    return (
                        <div
                            className="booking-viewer-table-category"
                            key={category}
                        >
                            <div className="booking-viewer-table-category-name">
                                <h2>{CHECKOUT_CATEGORIES_NAMES[category]}:</h2>
                            </div>
                            <div className="booking-viewer-table-rows">
                                {products[category].map((item) => (
                                    <BookingViewerTableRow
                                        itemData={item}
                                        category={category}
                                        key={item._id}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                }
                return null;
            })}
            <div className="booking-viewer-table-summary">
                <h3>Suma: {formatPrice(price)}</h3>
            </div>
        </div>
    </div>
);

export default BookingViewerTable;
