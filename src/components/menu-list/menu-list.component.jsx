import React from 'react';
import MenuItem from '../menu-item/menu-item.component';

import './menu-list.styles.scss';

const MenuList = ({ items, category, openPizzaPage, togglePopup }) => (
    <div className="menu-list">
        {items
            ? items.map((item, num) => (
                  <MenuItem
                      item={item}
                      category={category}
                      key={num}
                      open={openPizzaPage}
                      togglePopup={togglePopup}
                  />
              ))
            : null}
    </div>
);

export default MenuList;
