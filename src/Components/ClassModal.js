import React, { Component } from 'react'
import PopPop from 'react-poppop';
import dateFormat from 'dateformat'
import './Classes.css'

export default class ClassModal extends Component {
    state = {
        show: false, 
        clients: [], 
        error: null,
      }


    componentDidMount(){
        fetch(`https://wod-with-faris-backend.herokuapp.com/usersessions?class_id=${this.props.oneClass.id}`, {
        }).then(resp => resp.json()).then(clients => this.setState({clients}))
    }
  
  
    toggleShow = show => {
      this.setState({show: show, error: null});
    }

    handleBookandUnBookClass =  id => {
        const isBooked = this.state.clients.find(client => client.user.id === this.props.user.id)
        if (isBooked === undefined && this.props.user.tokens > 0 && this.state.clients.length < this.props.oneClass.class_capacity) {
            fetch("https://wod-with-faris-backend.herokuapp.com/usersession/book", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.props.user.id,
                    session_id: id
                })
            }).then(resp => resp.json()).then(ClientsWithNewBooking => this.setState({clients: ClientsWithNewBooking, error: null})).then(this.props.deductToken)
            
            fetch("https://api.pushover.net/1/messages.json", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: 'adohia1ym9d8bopuvjys6zrgdu4psa',
                    user: 'ubujnjnpw22cv58byd8w6kot7yx648',
                    sound: 'cashregister',
                    message: `${this.props.user.first_name + " " + this.props.user.last_name} booked the ${this.props.oneClass.time} class that's on ${dateFormat(this.props.oneClass.date, "fullDate")}`
                })
            })
            


        } else if(isBooked && this.props.user.tokens >= 0) {
            fetch(`https://wod-with-faris-backend.herokuapp.com/usersession/unbook`, {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.props.user.id,
                    session_id: id
                })
            }).then(resp => resp.json()).then(deletedBooking => this.setState({clients: this.state.clients.filter(client => client.user.id !== deletedBooking.user.id), error: null})).then(this.props.addToken)

            fetch("https://api.pushover.net/1/messages.json", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: 'adohia1ym9d8bopuvjys6zrgdu4psa',
                    user: 'ubujnjnpw22cv58byd8w6kot7yx648',
                    message: `${this.props.user.first_name + " " + this.props.user.last_name} unbooked the ${this.props.oneClass.time + " " + this.props.oneClass.name} class that's on ${dateFormat(this.props.oneClass.date, "fullDate")}`
                })
            })

        } else if (this.props.user.tokens <= 0){
            this.setState({error: 'Sorry, you have run out of passes. Please buy some more on the "Buy Passes" page.' })
        } else if (this.state.clients.length ===  this.props.oneClass.class_capacity) {
            this.setState({error: "Sorry, this class is fully booked"})
        }
        

    }

    render() {
        const { show, clients, error } = this.state;
        const { oneClass } = this.props;
        const isBooked = clients[0]&& this.props.user&& clients.find(client => client.user.id === this.props.user.id)? true : false
        const now = new Date()
        const classDateAndTime = new Date(oneClass.date + "T" + oneClass.time)
        const isInPast = classDateAndTime < now? true : false
        return (
            <div>
                <button class="class-btn" onClick={() => this.toggleShow(true)}>{oneClass.time + " " + oneClass.name}</button>
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow(false)}
                        closeOnOverlay={true}>
                <h1 className='workout-title'>{oneClass.time + " " + oneClass.name}</h1> <div className='attending-progress-bar'><div style={{width:`${((clients.length / oneClass.class_capacity) * 100).toFixed(2)}px`}}className='inner-progress-bar'><span className='attending-txt'>{clients.length === oneClass.class_capacity? "Fully Booked" : clients.length + ` / ${oneClass.class_capacity}`}</span></div></div>
                <h3 className='desc-txt'><strong>Coach: </strong>{oneClass.coach.first_name + " " + oneClass.coach.last_name}</h3>
                {oneClass.description.split('\n').map(sentence => (
                    <p className='desc-txt'>{sentence}</p> 
                ))
                }
                {!isInPast? <button onClick={() => this.handleBookandUnBookClass(this.props.oneClass.id)} class="book-btn">{isBooked? "Cancel" : "Book Class"}</button> : <button class="past-btn">Already Passed</button>}
                {error&&
                    <p className='error'>{this.state.error}</p>
                }
                </PopPop>
            </div>
        )
    }
}
