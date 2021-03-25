import React from 'react';

import './user-button.styles.scss';

const UserButton = ({ children, additionalClass, ...otherProps }) => (
    <span className={`user-button ${additionalClass}`} {...otherProps}>
        {children}
    </span>
);

export default UserButton;
