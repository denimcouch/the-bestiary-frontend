import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LogInContainer from "./containers/LogInContainer";
import MainContainer from "./containers/MainContainer";
import "./App.css";

const usersUrl = "http://localhost:3000/api/v1/users";
const monstersURL = "http://localhost:3000/api/v1/monsters";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      user: {},
      monsters: [],
    };
  }

  componentDidMount() {
    fetch(monstersURL)
      .then((res) => res.json())
      .then((monsters) => {
        // console.log(monsters)
        this.setState({
          monsters,
        });
      });
  }

  signUpUser = (userObj) => {
    const userOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userObj),
    };
    fetch(usersUrl, userOptions)
      .then((res) => res.json())
      .then((user) => {
        // console.log("New user from POST", user);
        debugger;
        this.setState({
          loggedIn: true,
          user,
        });
      });
  };

  logInUser = (userObj) => {
    const { username } = userObj.user;
    fetch(usersUrl + `/login/${username}`)
      .then((res) => res.json())
      .then((userData) => {
        console.log("User from logInUser", userData);
        let user = userData[0];
        this.setState({
          loggedIn: true,
          user,
        });
      });
  };

  logOutUser = () => {
    this.setState({
      loggedIn: false,
      user: {},
    });
  };

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  render() {
    return (
      <Router>
        <div id='app'>
          <Switch>
            <Route exact path="/">
              {" "}
              {this.state.loggedIn ? (
                <Redirect to="/main" />
              ) : (
                <LogInContainer
                  signUpUser={this.signUpUser}
                  logInUser={this.logInUser}
                />
              )}{" "}
            </Route>
            <Route path="/main">
              <MainContainer
                user={this.state.user}
                monsters={this.state.monsters}
                updateUser={this.updateUser}
                logOutUser={this.logOutUser}
              />{" "}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
