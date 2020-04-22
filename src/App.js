import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Loader from "react-loader-spinner";
import Table from "@material-ui/core/Table";

import { Login } from "./Login";
import { Home } from "./Home";
import MyStyledTable from "./MyStyledTable";
import "./styles.css";

import fire from "./config";

// import { render } from "react-dom";
// import Button from "material-ui/Button";
// import TextField from "material-ui/TextField";
// import Grid from "material-ui/Grid";
// import { CardHeader, CardContent, CardActions } from "material-ui/Card";

// import ResponsiveCard from "./ResponsiveCard.js";
// import ResponsiveContainerGrid from "./ResponsiveContainerGrid.js";
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      isLoaded: true,
      data: []
    };
    // this.authListener = this.authListener.bind(this);
    // this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      //console.log(user);
      if (user) {
        this.setState({ isLoaded: true });
        this.setState({ user });
        window.history.pushState({ home: 1 });
        // localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem("user");
      }
    });
  }

  saveUser = user => {
    console.log("user =", user);
    this.setState({ isLoaded: false });
    this.setState({ user });
  };

  signout() {
    const a = fire.auth().signOut();
    console.log("fire", a);
  }

  render() {
    console.log("User is", this.state.user);
    return (
      <div className="App">
        {!this.state.isLoaded && (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        )}
        <Router>
          <Switch>
            <Route path="/home">
              {this.state.user ? (
                <Home
                  data={this.state.data}
                  signout={this.signout}
                  user={this.state.user}

                  //handleSubmit={this.handleSubmit}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/test-home">
              <MyStyledTable />
            </Route>
            <Route exact path="/">
              <Login saveUser={this.saveUser} user={this.state.user} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
