import React from 'react';

import './custom-alert.styles.scss';

const CustomAlert = ({ children }) => (
    <aside className="custom-alert">
        <div className="custom-alert-wrapper">{children}</div>
    </aside>
);

export default CustomAlert;
