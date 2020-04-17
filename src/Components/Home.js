import React, { Component } from 'react'
import app from '../base'
import './Home.css'
import Schedule from './Schedule';
import ReactGA from 'react-ga';
const IG = require('instagrammer');
const instagramUsername = 'faziz_training';

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);
    ReactGA.pageview('/home');
}


export default class Home extends Component {
    
    state = {
        currentUser: this.props.currentUser,
        instaPosts: [],
        showSchedule: false
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
        
        IG.profile(instagramUsername).then((instaPosts) => {
            this.setState({instaPosts})
        });
      
    }

    toggleShow = show => {
        this.setState({showSchedule: show })
        ReactGA.event({
            category: 'User',
            action: `${this.props.user.first_name + " " + this.props.user.last_name} checked out the Schedule`
        });
    }

    render() {
        const { instaPosts } = this.state
        const SlicedPosts = instaPosts[0]? instaPosts.slice(0, 8) : []
        return (
            <>
            <button onClick={() => this.toggleShow(true)} className='class-schedule-btn'>View Class Schedule</button>
            <Schedule show={this.state.showSchedule} toggleShow={this.toggleShow}/>
                <div className='posts-container'>
                    <h2 className='title'>Recent Posts <a className='title' href={`https://www.instagram.com/faziz_training/`}>@faziz_training</a></h2>
                    <div className='posts-container'>
                        {SlicedPosts.map(post => (
                                <a href={`https://www.instagram.com/p/${post.node.shortcode}/`} >
                                    <img alt='' id='insta-post' className='insta-post' src={post.node.display_url} />
                                </a>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}
