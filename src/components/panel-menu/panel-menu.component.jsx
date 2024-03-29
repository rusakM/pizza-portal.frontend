import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import PanelMenuItem from '../panel-menu-item/panel-menu-item.component';
import { ReactComponent as Pizza } from '../../svg/pizza.svg';

import './panel-menu.styles.scss';

const PanelMenu = ({ reference, currentUser, items, logout }) => (
    <aside className="panel-menu" ref={reference}>
        <span
            className="panel-menu-close-button"
            onClick={() => {
                reference.current.style.display = 'none';
            }}
        >
            <FontAwesomeIcon icon={faTimes} />
        </span>
        <span className="panel-menu-logo">
            <Pizza />
        </span>
        <ul>
            <PanelMenuItem link="/">Strona główna</PanelMenuItem>
            <PanelMenuItem link="/menu">Menu</PanelMenuItem>
            <PanelMenuItem link="/#about" reference={reference}>
                O nas
            </PanelMenuItem>
            <PanelMenuItem link="/#contact" reference={reference}>
                Kontakt
            </PanelMenuItem>
            {currentUser ? (
                <PanelMenuItem link="/myAccount">Moje konto</PanelMenuItem>
            ) : (
                <PanelMenuItem link="/login">Logowanie</PanelMenuItem>
            )}
            {currentUser && (
                <PanelMenuItem link="/checkout">
                    <FontAwesomeIcon icon={faShoppingBag} />
                    &nbsp;Mój koszyk&nbsp;
                    {items ? `(${items})` : null}
                </PanelMenuItem>
            )}
            {currentUser && (
                <li className="panel-menu-item" onClick={logout}>
                    <span>Wyloguj</span>
                </li>
            )}
        </ul>
    </aside>
);

export default PanelMenu;
