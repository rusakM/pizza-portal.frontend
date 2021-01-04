import React from 'react';

import './login-input.styles.scss';

const LoginInput = ({ handleChange, label, ...otherProps }) => (
    <div className="login-input">
        {label ? <label>{label}</label> : null}

        <input onChange={handleChange} {...otherProps} />
    </div>
);

export default LoginInput;
