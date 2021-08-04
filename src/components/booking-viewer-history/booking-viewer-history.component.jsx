import React from 'react';
import BookingViewerHistoryRow from '../booking-viewer-history-row/booking-viewer-history-row.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Timeline } from './timeline.svg';
import UserButton from '../user-button/user-button.component';
import './booking-viewer-history.styles.scss';

const BookingViewerHistory = ({ history, refresh }) => {
    return (
        <div className="booking-viewer-history">
            <h2>Historia zamówienia:</h2>
            <div className="booking-viewer-history-wrapper">
                <div className="booking-viewer-history-arrow">
                    <Timeline />
                </div>
                <div className="booking-viewer-history-list">
                    {history.map((item) => (
                        <BookingViewerHistoryRow
                            bookingStatus={item}
                            key={item._id}
                        />
                    ))}
                </div>
            </div>
            <div className="booking-viewer-history-refresh">
                <UserButton onClick={refresh}>
                    <FontAwesomeIcon icon={faSync} />
                    &nbsp;Odśwież
                </UserButton>
            </div>
        </div>
    );
};

export default BookingViewerHistory;
