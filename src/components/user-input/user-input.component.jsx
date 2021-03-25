import React from 'react';

import './user-input.styles.scss';

const UserInput = ({ children, ...otherProps }) => (
    <div className="user-input-wrapper">
        <label>{children}</label>
        <input className="user-input" {...otherProps} />
    </div>
);

export default UserInput;
