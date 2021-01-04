import React from 'react';
import axios from 'axios';

import MenuButton from '../../components/menu-button/menu-button.component';
import MenuList from '../../components/menu-list/menu-list.component';

import './menu.styles.scss';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pizza: [],
            napoje: [],
            sosy: [],
            activeList: 'pizza',
        };
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `api/pizzas/templates?sort=+price`,
        }).then((response) => {
            this.setState({
                pizza: response.data.data,
            });
        });
    }

    clickHandlerMenuButton = (e) => {
        console.log(e.target);
        const name = e.target.innerText.toLowerCase();
        const url = `api/products?category=${e.target.innerText}`;
        if (!this.state[name].length && name !== 'pizza') {
            axios({
                method: 'GET',
                url,
            }).then((response) => {
                this.setState({
                    [name]: response.data.data,
                    activeList: name,
                });
            });
        } else {
            this.setState({
                activeList: name,
            });
        }
    };

    render() {
        return (
            <div>
                <section className="menu-header">
                    <div
                        className="menu-banner"
                        style={{
                            backgroundImage: `url('img/menu/menu-banner.jpg')`,
                        }}
                    >
                        <h1>Nasze menu</h1>
                    </div>
                </section>
                <div className="menu-buttons">
                    <MenuButton
                        clickHandler={this.clickHandlerMenuButton}
                        name="Pizza"
                        activeList={this.state.activeList}
                    />
                    <MenuButton
                        clickHandler={this.clickHandlerMenuButton}
                        name="Napoje"
                        activeList={this.state.activeList}
                    />
                    <MenuButton
                        clickHandler={this.clickHandlerMenuButton}
                        name="Sosy"
                        activeList={this.state.activeList}
                    />
                </div>
                <MenuList
                    items={this.state[this.state.activeList].data}
                    category={this.state.activeList}
                    addItemToCheckout={this.props.addItemToCheckout}
                />
            </div>
        );
    }
}

export default Menu;
