import React from "react";

import "./panel-menu-item.styles.scss";

const PanelMenuItem = ({ children, link, reference }) => (
  <li className="panel-menu-item">
    <a
      href={link}
      onClick={() => {
        if (reference) {
          reference.current.style.display = "none";
        }
      }}
    >
      {children}
    </a>
  </li>
);

export default PanelMenuItem;
