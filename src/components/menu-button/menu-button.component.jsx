import React from 'react';

import './menu-button.styles.scss';

const MenuButton = ({ clickHandler, name, activeList }) => {
    const optionalClass = activeList === name.toLowerCase() ? 'active' : '';
    return (
        <div
            className={`menu-button ${optionalClass}`}
            name={name}
            onClick={clickHandler}
        >
            {name}
        </div>
    );
};

export default MenuButton;
