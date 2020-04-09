import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Home from './Components/Home';
import PrivateRoute from './PrivateRoute';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import app from './base'
import NavBar from './Components/NavBar';
import Classes from './Components/Classes';
import Profile from './Components/Profile';
import CreateClass from './Components/CreateClass';
import Clients from './Components/Clients';
import ReactGA from 'react-ga';

function initializeReactGA() {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_PROJECT_ID);
  ReactGA.pageview('/');
}

class App extends React.Component {

  state = {
    currentUser: null, 
    userData: null
  }


  componentDidMount(){
    initializeReactGA()
  }

  
  handleSetUser = user => {
    this.setState({currentUser: user})
    fetch(`https://wod-with-faris.herokuapp.com/user/getuser?email=${user.email}`)
        .then(resp => resp.json())
        .then(userData => this.setState({userData}))
  }

  handleLogout = () => {
    app.auth().signOut()
    this.setState({currentUser: null})
  }

  render() { 
    const  { currentUser, userData } = this.state
    return (
      <>
        <NavBar userData={userData} logout={this.handleLogout} currentUser={currentUser}/>
        <PrivateRoute exact path='/classes' component={Classes}/>
        <PrivateRoute exact path='/profile' component={Profile}/>
        <PrivateRoute exact path='/createclass' component={CreateClass}/>
        <PrivateRoute exact path='/clients' component={Clients}/>
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


