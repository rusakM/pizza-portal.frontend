import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import LandingPage from "./pages/landing-page/landing-page.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  render() {
    return (
      <div>
        <Header
          currentUser={this.state.currentUser}
          history={this.props.history}
        />
        <Switch>
          <Route exact component={LandingPage} path="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
