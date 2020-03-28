import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../base';
import { AuthContext } from '../Auth';

function Login(props) {
    const handlelogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target;
            try {
                await app
                  .auth()
                  .signInWithEmailAndPassword(email.value, password.value);
            } catch (error) {
                alert(error);
            }
        },
        []
    )
    
    const { currentUser } = useContext(AuthContext)

    if (currentUser) {
        props.setUser(currentUser)
        return <Redirect to='/'/>;
    }

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handlelogin}>
                <label>
                    Email
                    <input name='email' type='email' placeholder='example@gmail.com'/>
                </label>
                <label>
                    Password
                    <input name='password' type='password' placeholder='Password'/>
                </label>
                <button type='submit' >Log in</button>
            </form>
        </div>
    )
}


export default withRouter(Login);