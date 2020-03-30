import React from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import app from '../base';
import './Login.css'
import { NavLink } from 'react-router-dom'

class SignUp extends React.Component {

    state = {
        firstName: null,
        lastName: null, 
        email: null,
        password: null,
        passwordConfirm: null,
        currentUser: null,
        passwordMatchError: ""
    }


    componentDidMount(){
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUser(user)
            }
        });

        const setUser = user => {
            this.setState({currentUser: user})
        }
    }

    handleSignUp = async () => {
        const { email, password, passwordConfirm } = this.state;
        try {
           if (password === passwordConfirm) { 
            await app
            .auth()
            .createUserWithEmailAndPassword(email, password);

            this.setState({passwordMatchError: ""})

            fetch("https://wod-with-faris.herokuapp.com/user/create", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                tokens: 0,
                coach: false
            })
            }).then(resp => resp.json()).then(resp => console.log(resp))

           } else {
               this.setState({passwordMatchError: "Passwords do not match"})
           }

        } catch (error) {
            alert(error);
        }
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value })
    }

    handleSetUser = user => {
        this.setState({currentUser: user})
    }



    
    render (){
        const {currentUser} = this.state
        console.log(currentUser)
    
        if (this.state.currentUser) {
            return <Redirect to='/'/>;
        }
        return (
            <div>
                <div className="form-structor">
                    <div className="signup">
                        <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                        <div className="form-holder">
                            <form>
                                <input onChange={this.handleChange} name='firstName' type="text" className="input" placeholder="First Name" />
                                <input onChange={this.handleChange} name='lastName' type="text" className="input" placeholder="Last Name" />
                                <input onChange={this.handleChange} name='email' type="email" className="input" placeholder="Email" />
                                <input onChange={this.handleChange} name='password' type="password" className="input" placeholder="Password" />
                                <input onChange={this.handleChange} name='passwordConfirm' type="password" className="input" placeholder="Confirm Password" />
                            </form>
                        </div>
                        <button onClick={this.handleSignUp} className="submit-btn">Sign up</button>
                    </div>
                    <div className="login slide-up">
                        <div className="center">
                            <NavLink to='/login'>
                                <h2 className="form-title" id="login"><span>or</span>Log in</h2>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(SignUp)
