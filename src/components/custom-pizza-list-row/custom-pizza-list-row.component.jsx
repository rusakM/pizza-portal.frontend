import React from 'react';
import PizzaPreviewBox from '../pizza-preview-box/pizza-preview-box.component';
import UserButton from '../user-button/user-button.component';

import './custom-pizza-list-row.styles.scss';

const CustomPizzaListRow = ({ pizzaData, open }) => (
    <div className="custom-pizza-list-row">
        <div className="custom-pizza-list-row-container">
            <div className="custom-pizza-list-row-wrapper">
                <div className="custom-pizza-list-row-photo">
                    <PizzaPreviewBox
                        ingredientsList={pizzaData.ingredients}
                        imgPath="pizza-creator-thumbnails"
                        imgClass="ingredient-thumbnail"
                        defaultImgClass="default-img-thumbnail"
                    />
                </div>
                <div>
                    {pizzaData.ingredients
                        .map((item) => item.name + ', ')
                        .join('') + 'mozzarella, oregano, sos pomidorowy'}
                </div>
            </div>
            <UserButton onClick={() => open(pizzaData._id)}>Wybierz</UserButton>
        </div>
    </div>
);

export default CustomPizzaListRow;
