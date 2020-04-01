import React, { Component } from 'react'
import app from '../base'
import './Home.css'
const IG = require('instagrammer');
const instagramUsername = 'faziz_training';

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
        
        IG.profile(instagramUsername).then((instaPosts) => {
            this.setState({instaPosts})
        });
      
    }

    render() {
        const { instaPosts } = this.state
        const SlicedPosts = instaPosts[0]? instaPosts.slice(0, 8) : []
        return (
            <div className='posts-container'>
                <h2 className='title'>Recent Posts</h2>
                <div className='posts-container'>
                    {SlicedPosts.map(post => (
                            <a href="https://www.instagram.com/faziz_training/" target="_blank">
                                <img id='insta-post' className='insta-post' src={post.node.display_url} />
                            </a>
                    ))}
                </div>
            </div>
        )
    }
}
