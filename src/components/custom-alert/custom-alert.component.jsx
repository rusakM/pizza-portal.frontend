import React from 'react';

import './custom-alert.styles.scss';

const CustomAlert = ({ children, header }) => (
    <aside className="custom-alert">
        <div className="custom-alert-wrapper">
            <h2>{header}</h2>
            {children}
        </div>
    </aside>
);

export default CustomAlert;
