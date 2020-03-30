import React, { Component } from 'react'
import './Classes.css'
import PopPop from 'react-poppop';

export default class CoachClassCard extends Component {

    state = {
        show: false,
        clients: []
    }

    handleCancelBooking = id => {
        fetch(`http://localhost:3000/sessions/deleted/${id}`, {
                method: "DELETE"
            }).then(resp => resp.json()).then(deletedBooking => this.props.handleCancel(deletedBooking))
    }

    toggleShow = show => {
        this.setState({show: show, tokenError: null});
    }

    componentDidMount(){
        fetch(`http://localhost:3000/usersessions?class_id=${this.props.upcomingClass.id}`, {
        }).then(resp => resp.json()).then(clients => this.setState({clients}))
    }

    render() {
        const { upcomingClass } = this.props
        const { show, clients } = this.state
        return (
            <div className='coach-class-card'>
                <h2 className='card-title'>{upcomingClass.time + " " + upcomingClass.name}</h2>
                <p className='card-date'>{upcomingClass.date}</p>
                <button onClick={() => this.handleCancelBooking(upcomingClass.id)} className='book-btn'>Delete Class</button>
                <button onClick={() => this.toggleShow(true)} className='book-btn'>More Info</button>
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow(false)}
                        closeOnOverlay={true}>
                <h1 className='workout-title'>{upcomingClass.time + " " + upcomingClass.name}</h1> <div className='attending-progress-bar'><div style={{width:`${((clients.length/8) * 100).toFixed(2)}px`}}className='inner-progress-bar'><span className='attending-txt'>{clients.length === 8? "Fully Booked" : clients.length + " / 8"}</span></div></div>
                <h3 className='desc-txt'><strong>Coach: </strong>{upcomingClass.coach.first_name + " " + upcomingClass.coach.last_name}</h3>
                <p className='desc-txt'>{upcomingClass.description}</p> 
                <div>
                    <h3 className='desc-txt'>Signed  Up Clients</h3>
                    {clients.map(client => (
                        <p className='desc-txt'>- {client.user.first_name + " " + client.user.last_name}</p>
                    ))}

                </div>
                </PopPop>
            </div>
        )
    }
}
