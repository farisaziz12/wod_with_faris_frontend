import React from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../base';
import './Login.css'
import { NavLink } from 'react-router-dom'
import PopPop from 'react-poppop';
import ReactGA from 'react-ga';

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);
    ReactGA.pageview('/login');
}


class Login extends React.Component {

    state = {
        currentUser: null, 
        email: null, 
        password: null,
        show: false,
        passwordResetEmail: null, 
        emailSent: false
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

    toggleShow = show => {
        this.setState({show: show});
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value })
    }
    handlePasswordResetEmailChange = event => {
        this.setState({[event.target.name]: event.target.value })
    }

    sendPasswordResetEmail = email => {
        app.auth().sendPasswordResetEmail(email).then(this.setState({emailSent: true}))
    }

    render(){
        const { currentUser, show, passwordResetEmail, emailSent } = this.state
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
                        <h3 onClick={this.toggleShow} className='forgot-password'><u>Forgot Password</u></h3>
                        <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow(false)}
                        closeOnOverlay={true}>
                            <div className='forgot-password-modal-container'>
                                <h2 className='forgot-password-txt'>Password Reset</h2>
                                {emailSent&& <p className='email-send-success'>Email Sent!</p>}
                                <p className='forgot-password-txt'>Please enter the email associated with your account:</p>
                                <input value={passwordResetEmail} onChange={this.handlePasswordResetEmailChange} name='passwordResetEmail' className='forgot-password-input' type='email'/>
                                <button onClick={() => this.sendPasswordResetEmail(passwordResetEmail)} className='forgot-password-btn'>Send Password Reset Email</button>
                                
                            </div>
                        </PopPop>
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
