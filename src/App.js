import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import LandingPage from './pages/landing-page/landing-page.component';
import PizzaViewer from './pages/pizza-viewer/pizza-viewer.component';
import CheckoutViewer from './pages/checkout-viewer/checkout-viewer.component';
import Menu from './pages/menu-page/menu.component';
import LoginPage from './pages/login-page/login-page.component';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
        };
    }

    componentDidMount() {
        if (!this.state.currentUser) {
            const currentUser =
                JSON.parse(localStorage.getItem('currentUser')) || null;
            this.setState({ currentUser });
        }
    }

    login = (email, password) => {
        axios({
            method: 'POST',
            url: `/api/users/login`,
            data: {
                email,
                password,
            },
        })
            .then((response) => {
                this.setState({
                    currentUser: response.data.data.user,
                    token: response.data.token,
                });
                localStorage.setItem(
                    'currentUser',
                    JSON.stringify(response.data.data.user)
                );
                this.props.history.push('/');
            })
            .catch((error) => console.log(error));
    };

    signup = (data) => {
        axios({
            method: 'POST',
            url: '/api/users/signup',
            data,
        })
            .then((response) => {
                this.setState({
                    currentUser: response.data.data.user,
                    token: response.data.token,
                });
                localStorage.setItem(
                    'currentUser',
                    JSON.stringify(response.data.data.user)
                );
                this.props.history.push('/');
            })
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <div>
                <Header
                    currentUser={this.state.currentUser}
                    history={this.props.history}
                />
                <Switch>
                    <Route exact component={LandingPage} path="/" />
                    <Route
                        exact
                        component={() => (
                            <Menu
                                history={this.props.history}
                                currentUser={this.state.currentUser}
                            />
                        )}
                        path="/menu"
                    />
                    <Route
                        component={() => (
                            <PizzaViewer
                                currentUser={this.state.currentUser}
                                history={this.props.history}
                            />
                        )}
                        path="/menu/pizza/:slug"
                    />
                    <Route
                        component={() => (
                            <LoginPage
                                login={this.login}
                                history={this.props.history}
                            />
                        )}
                        path="/login"
                    />
                    <Route
                        component={() => (
                            <CheckoutViewer
                                currentUser={this.state.currentUser}
                                history={this.props.history}
                            />
                        )}
                        path="/checkout"
                    />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
