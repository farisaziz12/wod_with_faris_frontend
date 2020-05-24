import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route } from "react-router-dom";
import ReactGA from "react-ga";
import Home from "./Components/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import app from "./base";
import NavBar from "./Components/NavBar";
import Classes from "./Components/Classes";
import Profile from "./Components/Profile";
import CreateClass from "./Components/CreateClass";
import Clients from "./Components/Clients";
import BuyPasses from "./Components/BuyPasses";
import Leaderboard from "./Components/Leaderboard";
import { Redirect } from "react-router";
import CreatePTSession from "./Components/CreatePTSession";

class App extends React.Component {
  state = {
    currentUser: null,
    userData: null,
    isHome: true,
  };

  componentWillMount() {
    const lastPage = localStorage.getItem("prevUrl");
    if (lastPage === "/") {
      this.setState({ isHome: true });
    } else {
      this.setState({ isHome: false });
    }
  }

  handleSetUser = (user) => {
    this.setState({ currentUser: user });
    fetch(
      `https://wod-with-faris-backend.herokuapp.com/user/getuser?email=${user.email}`
    )
      .then((resp) => resp.json())
      .then((userData) => this.setState({ userData }));
  };

  setHome = (state) => {
    this.setState({ isHome: state });
  };

  handleLogout = () => {
    ReactGA.event({
      category: "User",
      action: `${
        this.state.userData.first_name + " " + this.state.userData.last_name
      } logged out`,
    });
    app.auth().signOut();
    this.setState({ currentUser: null });

    localStorage.removeItem("prevUrl");
  };

  render() {
    const lastPage = localStorage.getItem("prevUrl");
    const { currentUser, userData, isHome } = this.state;
    return (
      <>
        <NavBar
          setHome={this.setHome}
          userData={userData}
          logout={this.handleLogout}
          currentUser={currentUser}
        />
        <PrivateRoute exact path="/classes" component={Classes} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/createclass" component={CreateClass} />
        <PrivateRoute exact path="/clients" component={Clients} />
        <PrivateRoute exact path="/buypasses" component={BuyPasses} />
        <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
        <PrivateRoute
          exact
          path="/createptsession"
          component={CreatePTSession}
        />
        <Route exact path="/">
          {isHome ? (
            <Home user={userData} setUser={this.handleSetUser} />
          ) : lastPage ? (
            <Redirect to={lastPage} />
          ) : (
            <Home user={userData} setUser={this.handleSetUser} />
          )}
        </Route>
        <Route exact path="/login">
          <Login setHome={this.setHome} setUser={this.handleSetUser} />
        </Route>
        <Route exact path="/signup">
          <SignUp setHome={this.setHome} />
        </Route>
      </>
    );
  }
}

export default App;
