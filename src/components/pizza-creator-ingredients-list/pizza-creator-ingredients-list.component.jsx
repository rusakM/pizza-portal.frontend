import React from 'react';
import UserButton from '../user-button/user-button.component';

import './pizza-creator-ingredients-list.styles.scss';

const PizzaCreatorIngredientsList = ({
    ingredients,
    usedIngredients,
    toggleIngredient,
}) => (
    <div className="pizza-creator-ingrdients-list">
        {ingredients.map((item, key) => {
            let isUsed = false;
            for (let i = 0; i < usedIngredients.length; i++) {
                if (item.id === usedIngredients[i].id) {
                    isUsed = true;
                    console.log(i);
                    break;
                }
            }
            return (
                <UserButton
                    additionalClass={
                        isUsed
                            ? 'ingredient-item ingredient-used'
                            : 'ingredient-item'
                    }
                    onClick={() => toggleIngredient(item, isUsed)}
                    key={key}
                >
                    {item.name}
                </UserButton>
            );
        })}
    </div>
);

export default PizzaCreatorIngredientsList;
