import React, { Component } from 'react'
import DatePick from './DatePick'
import './Classes.css'

let today = new Date()
let dd = today.getDate(); 
let mm = today.getMonth() + 1; 

let yyyy = today.getFullYear(); 
if (dd < 10) { 
    dd = '0' + dd; 
} 
if (mm < 10) { 
    mm = '0' + mm; 
} 
let todaydate = yyyy + '-' + mm + '-' + dd; 

export default class Classes extends Component {

    state = {
        classes: [],
        date: todaydate, 
        chosenClass: null
    }

    componentDidMount(){
        fetch("http://localhost:3000/sessions")
        .then(resp => resp.json())
        .then(classes => this.setState({classes}))
    }

    handleChange = e => {
        this.setState({
           [e.target.name]: e.target.value
        })
     }

     handlePickClass = id => { 
        const pickedClass = this.state.classes.find( oneClass => oneClass.id === id)
        this.setState({chosenClass: pickedClass})
     }

    render() {
        const  { date, classes } = this.state
        const filteredClasses = classes.filter(oneClass => oneClass.date === date)
        return (
            <div>
                <h1>Book Class</h1>
                <DatePick date={date} handleChange={this.handleChange}/>
                <div className='container'>
                    {filteredClasses.map(oneClass => (
                        <button onClick={() => this.handlePickClass(oneClass.id)} className='class-btn'>{oneClass.time + " " + oneClass.name}</button>
                    ))

                    }
                </div>
            </div>
        )
    }
}
