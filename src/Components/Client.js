import React, { Component } from 'react'
import './Clients.css'
import PopPop from 'react-poppop';

export default class Client extends Component {

    state = {
        show: false, 
        editMode: false,
        email: this.props.client.email,
        tokens: this.props.client.tokens
    }

    toggleShow = show => {
        this.setState({show: show});
    }
    
    toggleEditMode = () => {
        this.setState({editMode: true})
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }


    submitEdit = id => {
        fetch(`https://wod-with-faris.herokuapp.com/user/update/${id}`, {
                method: "PATCH", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    tokens: this.state.tokens
                })
        }).then(this.setState({editMode: false}))
    }

    render() {
        const { client } = this.props
        const { show, email, tokens, editMode } = this.state
        return (
            <div>
                <h3 onClick={this.toggleShow} className='client'>{client.first_name + " " + client.last_name}</h3>
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow(false)}
                        closeOnOverlay={true}>
                            <div className='client-modal-container'>
                                <h3 className='client-txt'>{client.first_name + " " + client.last_name}</h3>
                                <p className='client-txt'>Email: </p> {!editMode? <p className='client-txt'>{email}</p> : <input onChange={this.handleChange} className='edit-input' value={email} name='email'/>}
                                <p className='client-txt'>Class Passes: </p> {!editMode? <p className='client-txt'>{tokens}</p> : <input onChange={this.handleChange} className='edit-input' type='number' value={tokens} name='tokens'/>}
                                {!editMode? <button onClick={this.toggleEditMode} className='edit-btn'>Edit</button> : <button onClick={() => this.submitEdit(client.id)} className='edit-btn'>Submit</button>}
                            </div>
                </PopPop>
            </div>
        )
    }
}
