import React from "react";

import "./header-menu-item.styles.scss";

const HeaderMenuItem = ({ children, link }) => (
  <li className="header-menu-item">
    <a href={link}>{children}</a>
  </li>
);

export default HeaderMenuItem;
