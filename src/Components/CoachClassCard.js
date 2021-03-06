import React, { Component } from 'react'
import dateFormat from 'dateformat'
import PopPop from 'react-poppop';
import Select from 'react-select'
import './Classes.css'

export default class CoachClassCard extends Component {

    state = {
        show: false,
        clients: [],
        askDeleteConfirm: false,
        editMode: false,
        classDescription: this.props.upcomingClass.description,
        addClient: false,
        allClients: [],
        clientToAdd: null
    }
    
    componentDidMount(){
        fetch(`https://wod-with-faris-backend.herokuapp.com/usersessions?class_id=${this.props.upcomingClass.id}`, {
        }).then(resp => resp.json()).then(clients => this.setState({clients}))
    }


    handleClients = allClients => {
        const formatedClients = allClients[0]&& allClients.map(client => {
            return { label: client.first_name + " " + client.last_name, client: {first_name: client.first_name, last_name: client.last_name, id: client.id} }
        })
        this.setState({allClients: formatedClients})
    }

    handleDeleteClass = id => {
        fetch(`https://wod-with-faris-backend.herokuapp.com/sessions/deleted/${id}`, {
                method: "DELETE"
            }).then(resp => resp.json()).then(deletedBooking => this.props.handleCancel(deletedBooking))
        const ids = this.state.clients.map(client => {return client.user.id})
        fetch("https://wod-with-faris-backend.herokuapp.com/sessions/returntokens", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_ids: ids
            })
        }).then(this.setState({askDeleteConfirm: false}))
    }

    toggleShow = show => {
        this.setState({show: show, tokenError: null});
    }
    toggleDeleteConfirm = () => {
        this.setState({askDeleteConfirm: !this.state.askDeleteConfirm});
    }


    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = id => {
        fetch(`https://wod-with-faris-backend.herokuapp.com/sessions/update/${id}`, {
                method: "PATCH", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: this.state.classDescription
                })
        }).then(this.setState({editMode: false}))
    }

    toggleAddClient = () => {
        this.setState({addClient: !this.state.addClient})
        fetch('https://wod-with-faris-backend.herokuapp.com/users/index').then(resp => resp.json()).then(allClients => this.handleClients(allClients))
    }

    handleAddClientOrCancel = () => {
        if (!this.state.clientToAdd){
            this.setState({addClient: false})
        } else if (this.state.clientToAdd){
            fetch("https://wod-with-faris-backend.herokuapp.com/usersession/book", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.state.clientToAdd.id,
                    session_id: this.props.upcomingClass.id
                })
            }).then(resp => resp.json()).then(this.setState({clients: [...this.state.clients, {user: this.state.clientToAdd}], clientToAdd: null, addClient: null}))
        }
    }

    handleSetClient = e => {
        this.setState({clientToAdd: e.client})
    }

    render() {
        const { upcomingClass, coach } = this.props
        const { show, clients, askDeleteConfirm, editMode, classDescription, addClient, clientToAdd, allClients } = this.state
        return (
            <div className='coach-class-card'>
                <h2 className='card-title'>{upcomingClass.time + " " + upcomingClass.name}</h2>
                <p className='card-date'>{dateFormat(upcomingClass.date, "fullDate")}</p>
                {askDeleteConfirm? <div> <button onClick={() => this.handleDeleteClass(upcomingClass.id)} className='book-btn'>Confirm Delete</button> <button onClick={this.toggleDeleteConfirm} className='book-btn'>Cancel Delete</button> </div>: <button onClick={this.toggleDeleteConfirm} className='book-btn'>Delete Class</button>}
                {askDeleteConfirm? undefined : <button onClick={() => this.toggleShow(true)} className='book-btn'>More Info</button>}
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow(false)}
                        closeOnOverlay={true}>
                    <h1 className='workout-title'>{upcomingClass.time + " " + upcomingClass.name}</h1> <div className='attending-progress-bar'><div style={{width:`${((clients.length/upcomingClass.class_capacity) * 100 > 100? 100 : (clients.length/upcomingClass.class_capacity) * 100).toFixed(2)}px`}}className='inner-progress-bar'><span className='attending-txt'>{clients.length === 8? "Fully Booked" : clients.length + ` / ${upcomingClass.class_capacity}`}</span></div></div>
                    <h3 className='desc-txt'><strong>Coach: </strong>{coach.first_name + " " + coach.last_name}</h3>
                    {!editMode?
                    classDescription.split('\n').map(sentence => (
                        <p className='desc-txt'>{sentence}</p> 
                    ))
                    :
                    <textarea className='edit-desc' value={classDescription} onChange={this.handleChange} name='classDescription'/>
                    } 
                    <div>
                    {!editMode? <button className='book-btn' onClick={this.toggleEditMode}>Edit Workout</button> : <button className='book-btn' onClick={() => this.handleSubmit(upcomingClass.id)}>Submit</button>}
                        <h3 className='desc-txt'>Signed  Up Clients</h3>
                        {clients.map(client => (
                            <p className='desc-txt'>- {client.user.first_name + " " + client.user.last_name}</p>
                        ))}
                        {!clients[0]&&
                            <p className='desc-txt'>None</p>
                        }
                    {!addClient? <button className='book-btn' onClick={this.toggleAddClient}>Add Client</button> :<><Select className='activity-input' options={allClients} onChange={this.handleSetClient}/> <button className='book-btn' onClick={this.handleAddClientOrCancel}>{clientToAdd? 'Submit' : 'Cancel'}</button></>}
                    </div>
                </PopPop>
            </div>
        )
    }
}
