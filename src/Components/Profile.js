import React, { Component } from 'react'
import './Profile.css'

export default class Profile extends Component {

    state = {
        user: null
    }

    componentDidMount(){
        fetch(`http://localhost:3000/user/getuser?email=${this.props.currentUser.email}`)
        .then(resp => resp.json())
        .then(user => this.setState({user}))
    }

    render() {
        const { user } = this.state
        return (
            <div>
                <div className='profile-container'>
                    {user?
                    <h1>{user.first_name + " " + user.last_name}</h1>
                    
                    :
                    <button className='loading'></button >
                    }
                </div>
            </div>
        )
    }
}
