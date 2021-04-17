import React from 'react';
import UserButton from '../user-button/user-button.component';
import './alert-basic.styles.scss';

const AlertBasic = ({ children, buttonTxt, confirmAction }) => (
    <aside className="alert-basic">
        <div className="alert-wrapper">
            <p>{children}</p>
            <UserButton onClick={confirmAction}>{buttonTxt}</UserButton>
        </div>
    </aside>
);

export default AlertBasic;
