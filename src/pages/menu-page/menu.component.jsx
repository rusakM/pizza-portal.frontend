import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as PizzaSlice } from '../../svg/pizza-slice.svg';
import { ReactComponent as Soda } from '../../svg/soda.svg';
import { ReactComponent as SoySauce } from '../../svg/soy-sauce.svg';
import { ReactComponent as CustomPizza } from '../../svg/customization.svg';

import MenuList from '../../components/menu-list/menu-list.component';
import LeftListItem from '../../components/left-list-item/left-list-item.component';
import CustomPizzaListRow from '../../components/custom-pizza-list-row/custom-pizza-list-row.component';
import CustomAlert from '../../components/custom-alert/custom-alert.component';

import './menu.styles.scss';
import UserButton from '../../components/user-button/user-button.component';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pizza: [],
            napoje: [],
            sosy: [],
            activeList: 'pizza',
            customPizzaPopup: false,
            ownPizzas: [],
        };
    }

    async componentDidMount() {
        try {
            const templates = await axios({
                method: 'GET',
                url: `api/pizzas/templates?sort=+price`,
            });
            let ownPizzas = [];
            if (this.props.currentUser) {
                ownPizzas = await axios({
                    method: 'GET',
                    url: `api/pizzas/myPizzas`,
                });
                ownPizzas = ownPizzas.data.data.data;
            }

            this.setState({
                pizza: templates.data.data.data,
                ownPizzas,
            });
        } catch (error) {}
    }

    openPizzaPage = (slug) => {
        this.props.history.push(`/menu/pizza/${slug}`);
    };

    openCustomPizza = (id) => {
        this.props.history.push(`/pizza-creator/${id}`);
    };

    toggleCustomPizzaPopup = () => {
        this.setState({
            customPizzaPopup: !this.state.customPizzaPopup,
        });
    };

    clickHandlerMenuButton = async (category) => {
        try {
            const url = `api/products?category=${category}`;
            category = category.toLowerCase();
            if (!this.state[category].length && category !== 'pizza') {
                const products = await axios({
                    method: 'GET',
                    url,
                });
                this.setState({
                    [category]: products.data.data.data,
                    activeList: category,
                });
            } else {
                this.setState({
                    activeList: category,
                });
            }
        } catch (error) {
            console.log('fetching data error');
        }
    };

    render() {
        const { activeList, customPizzaPopup, ownPizzas } = this.state;
        return (
            <div className="menu">
                <div className="menu-container">
                    <div className="menu-buttons-desktop account-list account-list-desktop">
                        <ul>
                            <LeftListItem
                                link={this.clickHandlerMenuButton}
                                isActive={activeList === 'pizza'}
                                category="pizza"
                            >
                                Pizze
                            </LeftListItem>
                            <LeftListItem
                                link={this.clickHandlerMenuButton}
                                isActive={activeList === 'napoje'}
                                category="Napoje"
                            >
                                Napoje
                            </LeftListItem>
                            <LeftListItem
                                link={this.clickHandlerMenuButton}
                                isActive={activeList === 'sosy'}
                                category="Sosy"
                            >
                                Sosy
                            </LeftListItem>
                            {this.props.currentUser && (
                                <LeftListItem
                                    link={this.toggleCustomPizzaPopup}
                                    category=""
                                    isActive={false}
                                >
                                    Pizza własna
                                </LeftListItem>
                            )}
                        </ul>
                    </div>
                    <div className="menu-buttons-mobile account-list account-list-mobile">
                        <ul>
                            <LeftListItem
                                link={this.clickHandlerMenuButton}
                                isActive={activeList === 'pizza'}
                                category="pizza"
                            >
                                <PizzaSlice />
                            </LeftListItem>
                            <LeftListItem
                                link={this.clickHandlerMenuButton}
                                isActive={activeList === 'napoje'}
                                category="Napoje"
                            >
                                <Soda />
                            </LeftListItem>
                            <LeftListItem
                                link={this.clickHandlerMenuButton}
                                isActive={activeList === 'sosy'}
                                category="Sosy"
                            >
                                <SoySauce />
                            </LeftListItem>
                            {this.props.currentUser && (
                                <LeftListItem
                                    link={this.toggleCustomPizzaPopup}
                                    category=""
                                    isActive={false}
                                >
                                    <CustomPizza />
                                </LeftListItem>
                            )}
                        </ul>
                    </div>
                    <MenuList
                        items={this.state[this.state.activeList]}
                        category={this.state.activeList}
                        userIsLoggedIn={this.props.currentUser !== null}
                        openPizzaPage={this.openPizzaPage}
                    />
                </div>
                {customPizzaPopup && (
                    <CustomAlert>
                        <div className="custom-pizza-list-container">
                            <div className="custom-pizza-list-wrapper">
                                <p onClick={this.toggleCustomPizzaPopup}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </p>
                                <h2>Pizza własna:</h2>

                                <UserButton
                                    onClick={() =>
                                        this.props.history.push(
                                            '/pizza-creator'
                                        )
                                    }
                                >
                                    Stwórz pizzę
                                </UserButton>
                                <div className="custom-pizza-list">
                                    {ownPizzas.map((item) => (
                                        <CustomPizzaListRow
                                            pizzaData={item}
                                            key={item._id}
                                            open={this.openCustomPizza}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CustomAlert>
                )}
            </div>
        );
    }
}

export default Menu;
