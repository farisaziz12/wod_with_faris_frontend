import React, { Component } from 'react'
import PopPop from 'react-poppop'
import dateFormat from 'dateformat'
import { loadStripe } from "@stripe/stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import PTSessionCheckoutForm from './PTSessionCheckoutForm'
import './PTSessionCard.css'

const stripePromise = loadStripe('pk_live_4g3t1ZRoe5slZQbs5Vy3IaGe00fOR9THIq');

export default class PTSessionCard extends Component {

    state = {
        show: false,
        paid: this.props.upcomingPTSession.pt_session.paid
    }

    toggleShow = show => {
        this.setState({show: show});
    }

    handlePaid = () => {
        this.setState({paid: true})
    }

    render() {
        const { upcomingPTSession, user } = this.props
        const { show, paid } = this.state 
        return (
            <div className='class-card'>
                <h2 className='card-title'>{upcomingPTSession.pt_session.time + " " + upcomingPTSession.pt_session.name}</h2>
                <p className='card-date'>{dateFormat(upcomingPTSession.pt_session.date, "fullDate")}</p>
                <button onClick={() => this.toggleShow(true)} className='book-btn'>{!paid? 'Confirm' : 'Confirmed!'}</button>
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => this.toggleShow(false)}
                        closeOnOverlay={true}>
                <div className='pt-session-modal'>
                    <h1 className='pt-modal-title'>{upcomingPTSession.pt_session.time + " " + upcomingPTSession.pt_session.name}</h1>
                    <div className='pt-paid-status'><p style={{textAlign: 'center'}}>Status: <p style={paid? {color: 'green'} : {color: 'red'}}>{paid? 'Paid' : 'Not Paid'}</p></p></div>
                    <h3 className='desc-txt'><strong>Coach: </strong>{upcomingPTSession.coach.first_name + " " + upcomingPTSession.coach.last_name}</h3>
                    <h3 className='desc-txt'><strong>Location: </strong>{upcomingPTSession.pt_session.location}</h3>
                    {upcomingPTSession.pt_session.description.split('\n').map(sentence => (
                    <p className='desc-txt'>{sentence}</p> 
                    ))
                    }
                    {!paid&&
                        <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                            {({ stripe, elements }) => (
                            <PTSessionCheckoutForm handlePaid={this.handlePaid} userEmail={user.email} upcomingPTSession={upcomingPTSession} stripe={stripe} elements={elements} />
                            )}
                        </ElementsConsumer>
                        </Elements>
                    }
                </div>
                </PopPop>
            </div>
        )
    }
}
