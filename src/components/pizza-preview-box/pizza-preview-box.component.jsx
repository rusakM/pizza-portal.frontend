import React from 'react';

import './pizza-preview-box.styles.scss';

const PizzaPreviewBox = ({ ingredientsList }) => (
    <div className="pizza-preview-box">
        <img
            src="/uploads/pizzas/default.png"
            alt="default-pizza"
            className="default-pizza"
        />
        {ingredientsList.map((ingredient) => (
            <img
                src={`/uploads/pizza-creator/${ingredient.slug}.png`}
                alt={ingredient.slug}
                key={ingredient.slug}
                className="ingredient"
            />
        ))}
    </div>
);

export default PizzaPreviewBox;
