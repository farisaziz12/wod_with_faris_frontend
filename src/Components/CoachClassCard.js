import React, { Component } from 'react'
import './Classes.css'
import PopPop from 'react-poppop';

export default class CoachClassCard extends Component {

    state = {
        show: false,
        clients: [],
        askDeleteConfirm: false
    }

    handleDeleteClass = id => {
        fetch(`https://wod-with-faris.herokuapp.com/sessions/deleted/${id}`, {
                method: "DELETE"
            }).then(resp => resp.json()).then(deletedBooking => this.props.handleCancel(deletedBooking))
        const ids = this.state.clients.map(client => {return client.user.id})
        fetch("https://wod-with-faris.herokuapp.com/sessions/returntokens", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_ids: ids
            })
        })
    }

    toggleShow = show => {
        this.setState({show: show, tokenError: null});
    }
    toggleDeleteConfirm = () => {
        this.setState({askDeleteConfirm: !this.state.askDeleteConfirm});
    }

    componentDidMount(){
        fetch(`https://wod-with-faris.herokuapp.com/usersessions?class_id=${this.props.upcomingClass.id}`, {
        }).then(resp => resp.json()).then(clients => this.setState({clients}))
    }

    render() {
        const { upcomingClass } = this.props
        const { show, clients, askDeleteConfirm } = this.state
        return (
            <div className='coach-class-card'>
                <h2 className='card-title'>{upcomingClass.time + " " + upcomingClass.name}</h2>
                <p className='card-date'>{upcomingClass.date}</p>
                {askDeleteConfirm? <div> <button onClick={() => this.handleDeleteClass(upcomingClass.id)} className='book-btn'>Confirm Delete</button> <button onClick={this.toggleDeleteConfirm} className='book-btn'>Cancel Delete</button> </div>: <button onClick={this.toggleDeleteConfirm} className='book-btn'>Delete Class</button>}
                {askDeleteConfirm? undefined : <button onClick={() => this.toggleShow(true)} className='book-btn'>More Info</button>}
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow(false)}
                        closeOnOverlay={true}>
                <h1 className='workout-title'>{upcomingClass.time + " " + upcomingClass.name}</h1> <div className='attending-progress-bar'><div style={{width:`${((clients.length/8) * 100).toFixed(2)}px`}}className='inner-progress-bar'><span className='attending-txt'>{clients.length === 8? "Fully Booked" : clients.length + " / 8"}</span></div></div>
                <h3 className='desc-txt'><strong>Coach: </strong>{upcomingClass.coach.first_name + " " + upcomingClass.coach.last_name}</h3>
                {upcomingClass.description.split('\n').map(sentence => (
                    <p className='desc-txt'>{sentence}</p> 
                ))
                } 
                <div>
                    <h3 className='desc-txt'>Signed  Up Clients</h3>
                    {clients.map(client => (
                        <p className='desc-txt'>- {client.user.first_name + " " + client.user.last_name}</p>
                    ))}
                    {!clients[0]&&
                        <p className='desc-txt'>None</p>
                    }

                </div>
                </PopPop>
            </div>
        )
    }
}
