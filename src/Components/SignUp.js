import React, { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import app from '../base';
import { AuthContext } from '../Auth';

function SignUp() {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target;
        try {
            await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);

        } catch (error) {
            alert(error);
        }
    },  []);

    const { currentUser } = useContext(AuthContext)

    if (currentUser) {
        return <Redirect to='/'/>;
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Email
                    <input name='email' type='email' placeholder='example@gmail.com'/>
                </label>
                <label>
                    Password
                    <input name='password' type='password' placeholder='Password'/>
                </label>
                <button type='submit' >Sign Up</button>
            </form>
        </div>
    )
}


export default withRouter(SignUp)