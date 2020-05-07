import React, { Component } from 'react'
import DatePick from './DatePick'
import './Classes.css'
import ClassModal from './ClassModal'
import ReactGA from 'react-ga';

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);
    ReactGA.pageview('/classes');
}

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
        chosenClass: null,
        user: null,
        isLoading: true
    }

    componentDidMount(){
        initializeReactGA()

        fetch(`https://wod-with-faris-backend.herokuapp.com/sessions?date=${this.state.date}`)
        .then(resp => resp.json())
        .then(classes => this.setState({classes: classes, isLoading: false}))

        fetch(`https://wod-with-faris-backend.herokuapp.com/user/getuser?email=${this.props.currentUser.email}`)
        .then(resp => resp.json())
        .then(user => this.setState({user}))
    }

    handleDateChange = e => {
        this.setState({
           [e.target.name]: e.target.value,
           isLoading: true
        })
        this.dateFetch(e.target.value)
     }

     handlePickClass = id => { 
        const pickedClass = this.state.classes.find( oneClass => oneClass.id === id)
        this.setState({chosenClass: pickedClass})
     }

     deductToken = () => {
        const { user } = this.state 
        this.setState({user: {
            id: user.id,
            coach: user.coach,
            first_name: user.first_name,
            last_name: user.last_name, 
            email: user.email,
            tokens: user.tokens - 1
        }})
        ReactGA.event({
            category: 'User',
            action: `${this.state.user.first_name + " " + this.state.user.last_name} Booked a Class`
        });
     }
     addToken = () => {
        const { user } = this.state 
        this.setState({user: {
            id: user.id,
            coach: user.coach,
            first_name: user.first_name,
            last_name: user.last_name, 
            email: user.email,
            tokens: user.tokens + 1
        }})
        ReactGA.event({
            category: 'User',
            action: `${this.state.user.first_name + " " + this.state.user.last_name} Cancelled a Class`
        });
     }

    dateFetch = date => {
        fetch(`https://wod-with-faris-backend.herokuapp.com/sessions?date=${date}`)
        .then(resp => resp.json())
        .then(classes => this.setState({classes: classes, isLoading: false}))
    }

    handleDayOffset = offset => {
        let d = new Date(this.state.date)
        let prev = new Date(d.setDate(d.getDate() + offset)).toISOString().slice(0,10)
        this.setState({date: prev})
        this.dateFetch(prev)
    }


    render() {
        const  { date, classes, isLoading } = this.state
        const filteredClasses = classes.filter(oneClass => oneClass.date === date)
        const timeOrderedClasses = filteredClasses.sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time))
        return (
            <div>
                <h1>Book Class</h1>
                <DatePick  handleOffset={this.handleDayOffset} date={date} handleChange={this.handleDateChange}/>
                <div className='container'>
                    {isLoading&& <button className='loading'></button >}
                    {classes[0]?
                    timeOrderedClasses.map(oneClass => (
                        <ClassModal addToken={this.addToken} deductToken={this.deductToken} user={this.state.user} oneClass={oneClass} handlePickClass={this.handlePickClass}/>
                    ))
                    :
                    !isLoading&& <h1>No Classes</h1>
                    }
                </div>
            </div>
        )
    }
}
