import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './panel-menu.styles.scss';

const PanelMenu = ({ reference }) => (
    <aside className="panel-menu" ref={reference}>
        <span
            className="panel-menu-close-button"
            onClick={() => {
                reference.current.style.display = 'none';
            }}
        >
            <FontAwesomeIcon icon={faTimes} />
        </span>
        <ul>
            <li className="panel-menu-item">Strona główna</li>
            <li className="panel-menu-item">O nas</li>
            <li className="panel-menu-item">Menu</li>
            <li className="panel-menu-item">Kontakt</li>
            <li className="panel-menu-item">Logowanie</li>
        </ul>
    </aside>
);

export default PanelMenu;
