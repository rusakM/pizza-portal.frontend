import React from 'react';
import './pizza-viewer-buttons.styles.scss';

const PizzaViewerButtons = ({ changeSize, actualSize }) => {
    const sizes = [24, 32, 42];
    return (
        <div className="pizza-viewer-buttons">
            <p>Wybierz rozmiar pizzy:</p>
            <div className="buttons">
                {sizes.map((button, num) => {
                    const className = actualSize === button ? 'active-btn' : '';
                    return (
                        <span
                            className={className}
                            onClick={() => changeSize(button)}
                            key={num}
                        >{`${button}cm`}</span>
                    );
                })}
            </div>
        </div>
    );
};

export default PizzaViewerButtons;
