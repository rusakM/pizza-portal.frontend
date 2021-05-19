import React from 'react';

import './pizza-preview-box.styles.scss';

const PizzaPreviewBox = ({
    ingredientsList,
    imgPath,
    defaultImgClass,
    imgClass,
}) => (
    <div className="pizza-preview-box">
        <img
            src="/uploads/pizzas/default.png"
            alt="default-pizza"
            className={`default-pizza ${defaultImgClass ?? ''}`}
        />
        {ingredientsList.map((ingredient) => (
            <img
                src={`/uploads/${imgPath}/${ingredient.slug}.png`}
                alt={ingredient.slug}
                key={ingredient.slug}
                className={`ingredient ${imgClass ?? ''}`}
            />
        ))}
    </div>
);

export default PizzaPreviewBox;
