import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PizzaListRow from '../pizza-list-row/pizza-list-row.component';
import UserButton from '../user-button/user-button.component';
import Checkout, { CHECKOUT_CATEGORIES } from '../../checkout/checkout';

import './my-pizzas.styles.scss';

class MyPizzas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzas: [],
            dataReadyStatus: false,
        };
    }

    async componentDidMount() {
        try {
            let pizzas = await axios({
                url: '/api/pizzas/myPizzas',
                method: 'GET',
            });
            pizzas = pizzas.data.data.data;
            this.setState({ pizzas, dataReadyStatus: true });
        } catch (error) {}
    }

    removePizza = async (id) => {
        try {
            await axios({
                url: `/api/pizzas/${id}`,
                method: 'DELETE',
            });
            let pizzaId = 0;
            const { pizzas } = this.state;
            for (let i = 0; i < pizzas.length; i++) {
                if (pizzas[i]._id === id) {
                    pizzaId = i;
                    break;
                }
            }

            pizzas.splice(pizzaId, 1);

            this.setState({ pizzas });
        } catch (error) {}
    };

    editPizza = (id) => {
        this.props.history.push(`/pizza-creator/${id}`);
    };

    addToCart = (pizza) => {
        const checkout = new Checkout();
        checkout.addItem(pizza, CHECKOUT_CATEGORIES.OWN_PIZZA);
        this.props.togglePopup();
    };

    render() {
        const { pizzas, dataReadyStatus } = this.state;
        return (
            <div className=" my-pizzas account-container">
                {pizzas.length === 0 && dataReadyStatus && (
                    <p>
                        Nie utworzyłeś jeszcze żadnej pizzy. Skorzystaj z
                        naszego <a href="/pizza-creator">kreatora pizzy</a>.
                    </p>
                )}
                {pizzas.length > 0 && <h1>Moje pizze:</h1>}
                <UserButton
                    additionalClass="my-pizzas-new-btn"
                    onClick={() => this.props.history.push('/pizza-creator')}
                >
                    Utwórz nową
                </UserButton>
                <div className="my-pizzas-list">
                    {pizzas.map((pizza, num) => (
                        <PizzaListRow
                            pizza={pizza}
                            remove={this.removePizza}
                            addToCart={this.addToCart}
                            edit={this.editPizza}
                            key={num}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(MyPizzas);
