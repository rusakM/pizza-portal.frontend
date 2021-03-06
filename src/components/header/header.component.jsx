import React, { createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

import HeaderMenuItem from '../header-menu-item/header-menu-item.component';
import PanelMenu from '../panel-menu/panel-menu.component';
import './header.styles.scss';

const Header = ({ currentUser, history, items, logout }) => {
    const panelRef = createRef();
    return (
        <header>
            <ul className="header-menu">
                <HeaderMenuItem link="/">Strona główna</HeaderMenuItem>
                <HeaderMenuItem link="/menu">Menu</HeaderMenuItem>
                <HeaderMenuItem link="/#about">O nas</HeaderMenuItem>
                <HeaderMenuItem link="/#contact">Kontakt</HeaderMenuItem>
                {currentUser ? (
                    <HeaderMenuItem link="/myAccount">
                        Moje konto
                    </HeaderMenuItem>
                ) : (
                    <HeaderMenuItem link="/login">Logowanie</HeaderMenuItem>
                )}
                {currentUser ? (
                    <HeaderMenuItem link="/checkout">
                        <FontAwesomeIcon icon={faShoppingBag} />
                        &nbsp;Koszyk&nbsp;
                        {items ? `(${items})` : null}
                    </HeaderMenuItem>
                ) : null}
                {currentUser ? (
                    <li className="header-menu-item" onClick={logout}>
                        <span>Wyloguj</span>
                    </li>
                ) : null}
            </ul>
            <span
                className="header-menu-button"
                onClick={() => {
                    panelRef.current.style.display = 'flex';
                }}
            >
                <FontAwesomeIcon icon={faBars} />
            </span>
            <PanelMenu
                reference={panelRef}
                currentUser={currentUser}
                logout={logout}
            />
        </header>
    );
};

export default Header;
