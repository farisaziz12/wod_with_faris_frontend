import React, { Component } from 'react'
import app from '../base'

export default class Home extends Component {

    state = {
        currentUser: this.props.currentUser
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

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}
