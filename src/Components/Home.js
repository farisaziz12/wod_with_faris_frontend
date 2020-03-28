import React, { Component } from 'react'
import app from '../base'

export default class Home extends Component {

    state = {
        currentUser: this.props.currentUser
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}
