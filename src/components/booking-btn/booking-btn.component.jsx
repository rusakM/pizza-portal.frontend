import React from 'react';
import { withRouter } from 'react-router-dom';
import './booking-btn.styles.scss';

const BookingBtn = ({ children, link, history }) => (
    <button className="booking-btn" onClick={() => history.push(link)}>
        {children}
    </button>
);

export default withRouter(BookingBtn);
