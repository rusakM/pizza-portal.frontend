import React, { createRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Checkout, { CHECKOUT_CATEGORIES } from '../../checkout/checkout';

import PizzaViewerButtons from '../../components/pizza-viewer-buttons/pizza-viewer-buttons.component';
import PizzaPreviewBox from '../../components/pizza-preview-box/pizza-preview-box.component';
import PizzaCreatorIngredientsList from '../../components/pizza-creator-ingredients-list/pizza-creator-ingredients-list.component';
import './pizza-creator.styles.scss';
import UserButton from '../../components/user-button/user-button.component';

class PizzaCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 24,
            price: 15,
            ingredients: [],
            allIngredients: [],
            basicPrices: [15, 19, 23],
            pizzaId: this.props.history.location.pathname.split('/')[2] || null,
            defaultPizza: {
                ingredients: [],
                size: 24,
            },
        };
    }

    async componentDidMount() {
        try {
            const ingredients = await axios({
                url: '/api/supplies',
                method: 'GET',
            });
            let prices = await axios({
                url: '/api/pizzas/templates?name=Margherita',
                method: 'GET',
            });

            const pizzaFromId = await this.readPizzaFromId();

            prices = prices.data.data.data[0];
            prices = [
                prices.smallPizza.price,
                prices.mediumPizza.price,
                prices.largePizza.price,
            ];
            const newState = {
                allIngredients: ingredients.data.data.data,
                basicPrices: prices,
                price: prices[0],
                ...pizzaFromId,
            };
            if (pizzaFromId) {
                newState.defaultPizza = {
                    size: pizzaFromId.size,
                    ingredients: [...pizzaFromId.ingredients],
                };
            }
            this.setState(
                newState,
                () => pizzaFromId && this.changeSize(pizzaFromId.size)
            );
        } catch (error) {}
    }

    readPizzaFromId = async () => {
        const { pizzaId } = this.state;
        if (!pizzaId) {
            return null;
        }
        try {
            let pizza = await axios({
                url: `/api/pizzas/${pizzaId}`,
                method: 'GET',
            });

            pizza = pizza.data.data.data;

            return {
                ingredients: pizza.ingredients,
                size: pizza.size,
            };
        } catch (error) {
            return null;
        }
    };

    changeSize = (size) => {
        const { basicPrices } = this.state;
        let price;
        switch (size) {
            case 24:
                price = basicPrices[0];
                break;
            case 32:
                price = basicPrices[1];
                break;
            case 42:
                price = basicPrices[2];
                break;
            default:
                price = basicPrices[0];
                break;
        }
        this.setState({ size, price });
    };

    toggleIngredient = (ingredient, isUsed) => {
        const { ingredients } = this.state;
        let iToRemove;
        if (!isUsed) {
            ingredients.push(ingredient);
        } else {
            for (let i = 0; i < ingredients.length; i++) {
                if (ingredient.id === ingredients[i].id) {
                    iToRemove = i;
                    break;
                }
            }
            ingredients.splice(iToRemove, 1);
        }

        this.setState({ ingredients });
    };

    calculatePrice = () => {
        const { price, ingredients } = this.state;
        let sum = price * 100;
        if (ingredients.length > 0) {
            ingredients.forEach(
                (item) => (sum += Math.round(item.price * 100))
            );
        }
        return sum / 100;
    };

    reset = () => {
        const {
            defaultPizza: { ingredients, size },
        } = this.state;
        this.setState({ ingredients: [...ingredients], size });
    };

    createPizza = () => {
        const ingredients = this.state.ingredients.map((item) => item.id);
        const { size } = this.state;
        return {
            ingredients,
            size,
        };
    };

    save = async () => {
        const newPizza = this.createPizza();
        try {
            if (this.state.pizzaId) {
                const pizza = await axios({
                    url: `/api/pizzas/${this.state.pizzaId}`,
                    method: 'PATCH',
                    data: newPizza,
                });
                return pizza.data.data.data;
            }
            const pizza = await axios({
                url: '/api/pizzas',
                method: 'POST',
                data: {
                    ...newPizza,
                    user: this.props.currentUser._id,
                },
            });
            return pizza.data.data.data;
        } catch (error) {
            return null;
        }
    };

    addToCart = async () => {
        const pizza = await this.save();
        const checkout = new Checkout();
        checkout.addItem(pizza, CHECKOUT_CATEGORIES.OWN_PIZZA);
        this.props.history.push('/checkout');
    };

    render() {
        return (
            <div className="pizza-viewer">
                <div className="pizza-viewer-container">
                    <div className="pizza-viewer-header">
                        <span
                            className="back-btn"
                            onClick={() => {
                                this.props.history.push('/menu');
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                        <h2>
                            {this.state.pizzaId
                                ? 'Edytor Pizzy:'
                                : 'Stwórz Pizzę'}
                        </h2>
                    </div>
                    <PizzaPreviewBox ingredientsList={this.state.ingredients} />
                    <h1 className="pizza-viewer-price">
                        {`${this.calculatePrice()} zł`}
                    </h1>
                    <PizzaViewerButtons
                        changeSize={this.changeSize}
                        actualSize={this.state.size}
                    />
                    <PizzaCreatorIngredientsList
                        ingredients={this.state.allIngredients}
                        usedIngredients={this.state.ingredients}
                        toggleIngredient={this.toggleIngredient}
                    />
                    <div className="pizza-creator-buttons">
                        <UserButton
                            additionalClass="pizza-creator-btn pizza-creator-btn-danger"
                            onClick={this.reset}
                        >
                            Reset
                        </UserButton>
                        {this.state.pizzaId && (
                            <UserButton
                                additionalClass="pizza-creator-btn"
                                onClick={this.save}
                            >
                                Zapisz
                            </UserButton>
                        )}
                        <UserButton
                            additionalClass="pizza-creator-btn"
                            onClick={this.addToCart}
                        >
                            Dodaj do koszyka
                        </UserButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default PizzaCreator;
