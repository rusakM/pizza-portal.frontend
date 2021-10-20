import React, { createRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Checkout, { CHECKOUT_CATEGORIES } from '../../checkout/checkout';

import PizzaViewerPhoto from '../../components/pizza-viewer-photo/pizza-viewer-photo.component';
import PizzaViewerButtons from '../../components/pizza-viewer-buttons/pizza-viewer-buttons.component';
import PizzaVieverButton from '../../components/pizza-viewer-button/pizza-viewer-button.component';
import PizzaViewerIngredientsList from '../../components/pizza-viewer-ingredients-list/pizza-viewer-ingredients-list.component';
import ElementAddedToCheckout from '../../components/element-added-to-checkout/element-added-to-checkout.component';
import CheckoutBtn from '../../components/checkout-btn/checkout-btn.component';
import CustomAlert from '../../components/custom-alert/custom-alert.component';
import formatPrice from '../../utils/formatPrice';
import './pizza-viewer.styles.scss';

class PizzaViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzaData: {
                name: '',
            },
            currentPizza: null,
            currentSize: 24,
            elementAddedToCheckoutPopup: false,
        };
    }

    ingredientsList = createRef();

    resizeIngredientsList = () => {
        if (!this.ingredientsList.current) {
            return;
        }
        const { offsetWidth, children } = this.ingredientsList.current;
        let width = 0;
        Object.keys(children).forEach((elem) => {
            width += children[elem].offsetWidth * 1;
        });
        if (width > offsetWidth) {
            this.ingredientsList.current.style.justifyContent = 'flex-start';
        } else {
            this.ingredientsList.current.style.justifyContent = 'center';
        }
    };

    componentDidMount() {
        const slug = this.props.history.location.pathname.split('/')[3];
        axios({
            method: 'GET',
            url: `/api/pizzas/templates?slug=${slug}`,
        }).then((response) => {
            this.setState(
                {
                    pizzaData: response.data.data.data[0],
                    currentPizza: response.data.data.data[0].smallPizza,
                },
                () => this.resizeIngredientsList()
            );
        });
        window.addEventListener('resize', this.resizeIngredientsList);
    }

    componentDidUpdate() {}

    changeSize = (size) => {
        let currentPizza = this.state.pizzaData.smallPizza;
        let currentSize = 24;
        if (this.currentSize !== 24) {
            switch (size) {
                case 32:
                    currentPizza = this.state.pizzaData.mediumPizza;
                    currentSize = 32;
                    break;
                case 42:
                    currentPizza = this.state.pizzaData.largePizza;
                    currentSize = 42;
                    break;
                default:
                    break;
            }
        }
        this.setState({
            currentPizza,
            currentSize,
        });
    };

    addToCart = () => {
        if (!this.state.currentPizza) {
            return;
        }
        const checkout = new Checkout();
        const { currentPizza, pizzaData } = this.state;
        currentPizza.template = {
            id: pizzaData.id,
            coverPhoto: pizzaData.coverPhoto,
            name: pizzaData.name,
            slug: pizzaData.slug,
        };
        checkout.addItem(currentPizza, CHECKOUT_CATEGORIES.PIZZA);
        this.togglePopup();
    };

    togglePopup = () => {
        this.setState({
            elementAddedToCheckoutPopup:
                !this.state.elementAddedToCheckoutPopup,
        });
    };

    render() {
        const ingredients = this.state.pizzaData.smallPizza
            ? this.state.pizzaData.smallPizza.ingredients.map((ingredient) => {
                  return {
                      name: ingredient.name,
                      coverPhoto: `/uploads/supplies/${ingredient.coverPhoto}`,
                  };
              })
            : [];
        const { elementAddedToCheckoutPopup } = this.state;
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
                        <h2>{this.state.pizzaData.name}</h2>
                    </div>
                    {this.state.pizzaData.id ? (
                        <PizzaViewerPhoto
                            coverPhoto={this.state.pizzaData.coverPhoto}
                        />
                    ) : null}
                    <h1 className="pizza-viewer-price">
                        {this.state.currentPizza
                            ? `${formatPrice(this.state.currentPizza.price)}`
                            : '0 zł'}
                    </h1>
                    <PizzaViewerButtons
                        changeSize={this.changeSize}
                        actualSize={this.state.currentSize}
                    />
                    {this.state.currentPizza ? (
                        <PizzaVieverButton addToCart={this.addToCart} />
                    ) : null}
                    <PizzaViewerIngredientsList
                        ingredients={ingredients}
                        reference={this.ingredientsList}
                    />
                </div>
                {elementAddedToCheckoutPopup && (
                    <CustomAlert>
                        <ElementAddedToCheckout confirm={this.togglePopup} />
                    </CustomAlert>
                )}
                <CheckoutBtn />
            </div>
        );
    }
}

export default PizzaViewer;
