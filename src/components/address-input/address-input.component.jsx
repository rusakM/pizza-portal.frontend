import React from 'react';

import './address-input.styles.scss';

const AddressInput = ({ classes, ...props }) => (
    <input type="text" className={classes} {...props} />
);

export default AddressInput;
