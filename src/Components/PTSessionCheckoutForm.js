import React, { Component } from 'react'
import { CardElement } from "@stripe/react-stripe-js"
import CardSection from './CardSection'
import dateFormat from 'dateformat'
import './CheckoutForm.css'

export default class PTSessionCheckoutForm extends Component {

    state = {
        name: "",
        paymentSuccess: false, 
        paymentError: null,
        paymentPending: false
    }


    handleNameChange = event => {
        this.setState({name: event.target.value})
    }

    handleSubmit = async event => {
        this.setState({paymentPending: true})
        event.preventDefault();
    
        const { stripe, elements } = this.props;
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
            window.alert(result.error.message);
        } else {
            const { upcomingPTSession } = this.props
            fetch("https://wod-with-faris-backend.herokuapp.com/users/payforptsession", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: upcomingPTSession.price,
                    description: `Personal Training Session`, 
                    token: result.token.id
                })
            }).then(resp => resp.json()).then(resp => this.cardPayment(resp.client_secret))
        }
    };


    cardPayment = async (clientSecret) => {
        const { stripe, elements } = this.props;
        const { name } = this.state

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: name,
              },
            }
    })

        if (result.error) {
            this.setState({paymentPending: false, paymentError: result.error.message})
          } else {
            if (result.paymentIntent.status === 'succeeded') {
                this.setState({paymentPending: false, paymentSuccess: true, paymentError: null})
                this.props.handlePaid()
                
                const { upcomingPTSession } = this.props
                fetch("https://wod-with-faris-backend.herokuapp.com/ptsessions/confirmptsession", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pt_session: upcomingPTSession.id
                })
            }).then(
                setTimeout(() => {
                    this.setState({paymentSuccess: false})
                }, 6000)
                )

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
                        message: `${this.state.name} paid CHF${this.props.upcomingPTSession.price} and confirmed the Personal Training that is on ${dateFormat(this.props.upcomingPTSession.date, "fullDate")} at ${this.props.upcomingPTSession.time}`
                    })
                })
            }
        }
    }

    render() {
        const { upcomingPTSession } = this.props
        const { name, paymentSuccess, paymentError, paymentPending } = this.state
        return (
            <div>
                <div className='checkout-form'>
                    {paymentSuccess&&<p className='payment-success'>Payment Successful</p>}
                    {paymentError&&<p className='payment-error'>Error: {paymentError}</p>}
                {paymentSuccess?
                    <h1 className='payment-success'>Thank you! Your PT Session has been confirmed!</h1>
                :
                <>
                    <div class="product-info">
                        <h4 className="product-price">Total: CHF {upcomingPTSession.price}</h4>
                    </div>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input className='name-card-input' required value={name} onChange={this.handleNameChange} type='text' placeholder='Full Name as displayed on card'/>
                        <CardSection/>
                        {paymentPending? <button className='loading-spinner'> </button> : <button className="btn-pay">Pay</button>}
                    </form>
                </>
                }
                </div>
            </div>
        )
    }
}