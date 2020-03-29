import React, { Component } from 'react'
import app from '../base'
import './Home.css'


export default class Home extends Component {

    state = {
        currentUser: this.props.currentUser,
        instaPosts: []
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
        const IG = require('instagrammer');
        const instagramUsername = 'faziz_training';
        
        IG.profile(instagramUsername).then((instaPosts) => {
            this.setState({instaPosts})
        });
    }

    render() {
        const { instaPosts } = this.state
        const SlicedPosts = instaPosts.slice(0, 8)
        return (
            <div className='posts-container'>
                <h2 className='title'>Recent Posts</h2>
                <div className='posts-container'>
                    {SlicedPosts.map(post => (
                            <img id='insta-post' className='insta-post' src={post.node.display_url} />
                    ))}
                </div>
            </div>
        )
    }
}
