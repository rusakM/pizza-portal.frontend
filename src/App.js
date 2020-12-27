import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import LandingPage from "./pages/landing-page/landing-page.component";
import PizzaViewer from "./pages/pizza-viewer/pizza-viewer.component";
import Menu from "./pages/menu-page/menu.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      checkoutItems: 0,
      checkout: {
        pizzas: [],
        products: [],
        templates: [],
        user: "",
        paymentMethod: "",
        paymentType: "",
      },
    };
  }

  addItemToCheckout = (id, category) => {
    const { checkout } = this.state;
    checkout[category].push(id);
    this.setState({
      checkout,
      checkoutItems: this.state.checkoutItems + 1,
    });
  };

  removeItemFromCheckout = (id, category) => {
    const { checkout } = this.state;
    const index = checkout[category].indexOf(id);
    checkout[category].splice(index, 1);
    this.setState({
      checkout,
      checkoutItems: this.state.checkoutItems - 1,
    });
  };

  clearCheckout = () => {
    const user = this.state.currentUser.id || "";
    this.setState({
      checkout: {
        pizzas: [],
        products: [],
        templates: [],
        user,
        paymentMethod: "",
        paymentType: "",
      },
    });
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
                addItemToCheckout={this.addItemToCheckout}
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
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
