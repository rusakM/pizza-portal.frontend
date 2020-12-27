import React from 'react';
import './pizza-viewer-ingredient.styles.scss';

const PizzaViewerIngredient = ({ ingredient }) => (
    <div className="pizza-viewer-ingredient">
        <div className="card">
            <img src={ingredient.coverPhoto} alt={ingredient.name} />
            <p>{ingredient.name}</p>
        </div>
    </div>
);

export default PizzaViewerIngredient;
