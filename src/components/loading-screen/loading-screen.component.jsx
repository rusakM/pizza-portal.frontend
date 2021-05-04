import React from 'react';
import { ReactComponent as Pizza } from './pizza.svg';

import './loading-screen.styles.scss';

const LoadingScreen = () => (
    <div className="loading-screen">
        <Pizza className="loading-screen-icon" />
    </div>
);

export default LoadingScreen;
