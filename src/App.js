import React from "react";
import { Route, Switch } from "react-router-dom";
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
      <Switch>
        <Route exact component={LandingPage} path="/" />
      </Switch>
    );
  }
}

export default App;
