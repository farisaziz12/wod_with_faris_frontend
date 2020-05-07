import React, { Component } from 'react'
import './CreateClass.css'

export default class CreateClass extends Component {

    state = {
        name: null,
        description: null,
        date: null,
        time: null,
        classCapacity: 8, 
        coach: null, 
        success: false,
        errorMessage: null
    }

    componentDidMount(){
        fetch(`https://wod-with-faris-backend.herokuapp.com/user/getuser?email=${this.props.currentUser.email}`)
        .then(resp => resp.json())
        .then(coach => this.setState({coach}))
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
         })
    }

    handleCreateClass = () => {
        const { name, description, date, time, coach, classCapacity } = this.state
        if ( name && description && date && time && classCapacity  ){
        fetch("https://wod-with-faris-backend.herokuapp.com/sessions/create", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name, 
                    description: description,
                    date: date,
                    time: time,
                    class_capacity: parseInt(classCapacity),
                    user_id: coach.id
                })
            }).then(resp => resp.json()).then(this.setState({success: true, errorMessage: null, name: "", description: "", date: "", time: ""}))
            .catch(errorMessage => this.setState({errorMessage}))
        } else {
            this.setState({errorMessage: "Please fill all fields"})
        }
    } 

    render() {
        const { success, errorMessage, name, date, description, time, classCapacity } = this.state
        return (
            <div>
                <h1 className='create-class-title'>Create Class</h1>
                {success&&
                        <h2 className='success'>Class Created!</h2>
                }
                {errorMessage&&
                        <h2 className='error-message'>{errorMessage}</h2>
                }
                <div className='create-class-div'>
                    <h3 className='create-class-h3'>Name</h3>
                    <input name='name' value={name} onChange={this.handleChange} className='create-class-input' type='text'/>
                    <h3 className='create-class-h3' >Description</h3>
                    <textarea name='description' value={description} onChange={this.handleChange} className='create-class-textarea'/>
                    <h3 className='create-class-h3'>Date</h3>
                    <input name='date' value={date} onChange={this.handleChange} className='create-class-input' type='date'/>
                    <h3 className='create-class-h3'>Time</h3>
                    <input name='time' value={time} onChange={this.handleChange} className='create-class-input' type='time'/>
                    <h3 className='create-class-h3'>Class Capacity</h3>
                    <input name='classCapacity' value={classCapacity} onChange={this.handleChange} className='create-class-input' type='number'/>
                    <button className='create-class-btn' onClick={this.handleCreateClass}>Create Class</button>
                </div>
            </div>
        )
    }
}
