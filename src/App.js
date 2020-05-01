import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import ReactGA from 'react-ga'
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
import BuyPasses from './Components/BuyPasses';
import MobileMenu from './Components/MobileMenu'
import Leaderboard from './Components/Leaderboard';
import { Redirect } from 'react-router'

const lastPage = localStorage.getItem('prevUrl')

class App extends React.Component {

  state = {
    currentUser: null, 
    userData: null, 
    screenWidth: window.innerWidth
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  
  handleSetUser = user => {
    this.setState({currentUser: user})
    fetch(`https://wod-with-faris.herokuapp.com/user/getuser?email=${user.email}`)
        .then(resp => resp.json())
        .then(userData => this.setState({userData}))
  }

  handleLogout = () => {
    ReactGA.event({
      category: 'User',
      action: `${this.state.userData.first_name + " " + this.state.userData.last_name} logged out`
  });
    app.auth().signOut()
    this.setState({currentUser: null})

    localStorage.removeItem("prevUrl");
  }

  render() { 
    const  { currentUser, userData, screenWidth } = this.state
    const isMobile = screenWidth <= 500;
    return (
      <>
        {isMobile? <div className='mobile-menu'><MobileMenu userData={userData} currentUser={currentUser} logout={this.handleLogout}/></div> : <NavBar userData={userData} logout={this.handleLogout} currentUser={currentUser}/>}
        <PrivateRoute exact path='/classes' component={Classes}/>
        <PrivateRoute exact path='/profile' component={Profile}/>
        <PrivateRoute exact path='/createclass' component={CreateClass}/>
        <PrivateRoute exact path='/clients' component={Clients}/>
        <PrivateRoute exact path='/buypasses' component={BuyPasses}/>
        <PrivateRoute exact path='/leaderboard' component={Leaderboard}/>
        <Route exact path='/'>
        {console.log(lastPage)}
        {lastPage === '/'?
          <Home user={userData} setUser={this.handleSetUser}/>
          :
          lastPage? <Redirect to={lastPage}/> : 
          <Home user={userData} setUser={this.handleSetUser}/>
        }
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


