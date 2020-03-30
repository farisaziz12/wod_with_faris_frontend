import React, { Component } from 'react'
import PopPop from 'react-poppop';
import './Classes.css'

export default class ClassModal extends Component {
    state = {
        show: false, 
        clients: [], 
        error: null,
      }


    componentDidMount(){
        fetch(`http://localhost:3000/usersessions?class_id=${this.props.oneClass.id}`, {
        }).then(resp => resp.json()).then(clients => this.setState({clients}))
    }
  
  
    toggleShow = show => {
      this.setState({show: show, error: null});
    }

    handleBookandUnBookClass =  id => {
        const isBooked = this.state.clients.find(client => client.user.id === this.props.user.id)
        if (isBooked === undefined && this.props.user.tokens > 0 && this.state.clients.length < 8) {
            console.log("booking")
            fetch("http://localhost:3000/usersession/book", {
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
            
        } else if(isBooked && this.props.user.tokens >= 0) {
            fetch(`http://localhost:3000/usersession/unbook`, {
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
            
        } else if (this.props.user.tokens <= 0){
            this.setState({error: "Sorry, you have run out of tokens"})
        } else if (this.state.client.length === 8) {
            this.setState({error: "Sorry, this class is fully booked"})
        }
        

    }

    render() {
        const {show, clients, error} = this.state;
        const {oneClass} = this.props;
        const isBooked = this.state.clients.find(client => client.user.id === this.props.user.id)
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
                <h1 className='workout-title'>{oneClass.time + " " + oneClass.name}</h1> <div className='attending-progress-bar'><div style={{width:`${((clients.length/8) * 100).toFixed(2)}px`}}className='inner-progress-bar'><span className='attending-txt'>{clients.length === 8? "Fully Booked" : clients.length + " / 8"}</span></div></div>
                <h3 className='desc-txt'><strong>Coach: </strong>{oneClass.coach.first_name + " " + oneClass.coach.last_name}</h3>
                <p className='desc-txt'>{oneClass.description}</p> 
                {!isInPast? <button onClick={() => this.handleBookandUnBookClass(this.props.oneClass.id)} class="book-btn">{isBooked? "Cancel" : "Book Class"}</button> : <button class="past-btn">Already Passed</button>}
                {error&&
                    <p className='error'>{this.state.error}</p>
                }
                </PopPop>
            </div>
        )
    }
}
