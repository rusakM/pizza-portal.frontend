import React from 'react';
import PizzaViewerIngredient from '../pizza-viewer-ingredient/pizza-viewer-ingredient.component';

import './pizza-viewer-ingredients-list.styles.scss';

const PizzaViewerIngredientsList = ({ ingredients, reference }) => {
    const ingredientsList = [
        {
            name: 'mozzarella',
            coverPhoto: '/img/ingredients/mozzarella.png',
        },
        {
            name: 'sos pomidorowy',
            coverPhoto: '/img/ingredients/sospomidorowy.png',
        },
        {
            name: 'oregano',
            coverPhoto: '/img/ingredients/oregano.png',
        },
        ...ingredients,
    ];

    return (
        <div className="pizza-viewer-ingredients-list">
            <p>Lista składników:</p>
            <div className="ingredients-list" ref={reference}>
                {ingredientsList.map((ingredient, num) => (
                    <PizzaViewerIngredient ingredient={ingredient} key={num} />
                ))}
            </div>
        </div>
    );
};

export default PizzaViewerIngredientsList;
