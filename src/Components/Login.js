import React from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../base';
import './Login.css'
import { NavLink } from 'react-router-dom'

class Login extends React.Component {

    state = {
        currentUser: null, 
        email: null, 
        password: null
    }

    componentDidMount(){
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUser(user)
            }
        });

        const setUser = user => {
            this.setState({currentUser: user})
            this.props.setUser(user)
        }
    }

    handlelogin = async () => {
            const { email, password } = this.state;
            try {
                await app
                  .auth()
                  .signInWithEmailAndPassword(email, password);
            } catch (error) {
                alert(error);
            }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value })
    }

    
    render(){
        const { currentUser } = this.state
        if (currentUser) {
            return <Redirect to='/'/>;
        }
        return (
            <div>
                <div className="form-structor">
                    <div className="signup">
                        <h2 className="form-title" id="signup"><span>or</span>Log In</h2>
                        <div className="form-holder">
                        <input onChange={this.handleChange} name='email' type="email" className="input" placeholder="Email" />
                        <input onChange={this.handleChange} name='password' type="password" className="input" placeholder="Password" />
                        </div>
                        <button onClick={this.handlelogin} className="submit-btn">Log In</button>
                    </div>
                    <div className="login slide-up">
                        <div className="center">
                            <NavLink to='/signup'>
                                <h2 className="form-title" id="login"><span>or</span>Sign Up</h2>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Login);
