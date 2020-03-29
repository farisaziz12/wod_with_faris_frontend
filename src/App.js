import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import Home from './Components/Home';
import PrivateRoute from './PrivateRoute';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { AuthContext } from './Auth';
import app from './base'
import NavBar from './Components/NavBar';
import Classes from './Components/Classes';
import Profile from './Components/Profile';


class App extends React.Component {

  state = {
    currentUser: null
  }



  handleSetUser = user => {
    this.setState({currentUser: user})
  }

  handleLogout = () => {
    app.auth().signOut()
    this.setState({currentUser: null})
}

  componentDidMount(){
    const { currentUser } = AuthContext
    this.setState({currentUser})
  }

  render() { 
    const  { currentUser } = this.state
    return (
      <>
        <NavBar logout={this.handleLogout} currentUser={currentUser}/>
        <PrivateRoute exact path='/classes' component={Classes}/>
        <PrivateRoute exact path='/profile' component={Profile}/>
        <Route exact path='/'>
          <Home setUser={this.handleSetUser}/>
        </Route>
        <Route exact path='/login'>
          <Login setUser={this.handleSetUser}/>
        </Route>
        <Route exact path='/signup' component={SignUp}/>
      </>
    );
  }
}

export default App;


