import React from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import app from '../base';
import './Login.css'
import { NavLink } from 'react-router-dom'
import ReactGA from 'react-ga';

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);
    ReactGA.pageview('/signup');
}

class SignUp extends React.Component {

    state = {
        firstName: null,
        lastName: null, 
        email: null,
        password: null,
        passwordConfirm: null,
        currentUser: null,
        passwordMatchError: "",
        emailSent: false,
        emptyFieldsError: null
    }


    componentDidMount(){
        initializeReactGA()

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
        const { email, password, passwordConfirm , firstName, lastName} = this.state;
        try {
           if (password === passwordConfirm && email !== null) { 
            await app
            .auth()
            .createUserWithEmailAndPassword(email, password);
            this.setState({passwordMatchError: null, emptyFieldsError: null})

            fetch("https://wod-with-faris-backend.herokuapp.com/user/create", {
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

            fetch("https://api.pushover.net/1/messages.json", {
                    method: "POST", 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: 'adohia1ym9d8bopuvjys6zrgdu4psa',
                        user: 'ubujnjnpw22cv58byd8w6kot7yx648',
                        message: `${this.state.firstName + " " + this.state.lastName} signed up!`
                    })
            })

           } else if (!password || !passwordConfirm || !email || !firstName || !lastName){
               this.setState({emptyFieldsError: "Please fill all the fields", passwordMatchError: null})
           } else {
            this.setState({passwordMatchError: "Passwords do not match", emptyFieldsError: null})
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
        const {currentUser, emailSent, passwordMatchError, emptyFieldsError} = this.state
        if (currentUser) {
            if(!currentUser.emailVerified && !emailSent){
                currentUser.sendEmailVerification();
                this.setState({emailSent: true})
            } else {
                this.props.setHome(true)
                return <Redirect to='/'/>;
            }
        }
        return (
            <div>
                <div className="form-structor">
                    <div className="signup">
                        {passwordMatchError&& <p className='sign-up-error'>{passwordMatchError}</p>}{emptyFieldsError&& <p className='sign-up-error'>{emptyFieldsError}</p>}
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
