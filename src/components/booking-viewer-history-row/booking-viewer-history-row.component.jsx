import React from 'react';
import { formatFullDate } from '../../utils/formatDate';
import './booking-viewer-history-row.styles.scss';

const BookingViewerHistoryRow = ({ bookingStatus }) => (
    <div className="booking-viewer-history-row">
        <div className="booking-viewer-history-row-description">
            <h5>{bookingStatus.description}</h5>
        </div>
        <div className="booking-viewer-history-row-date">
            <p>{formatFullDate(bookingStatus.createdAt)}</p>
        </div>
    </div>
);

export default BookingViewerHistoryRow;
