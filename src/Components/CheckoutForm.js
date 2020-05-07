import React, { Component } from 'react'
import PopPop from 'react-poppop';
import { CardElement } from "@stripe/react-stripe-js"
import CardSection from './CardSection'
import './CheckoutForm.css'

export default class CheckoutForm extends Component {

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
            const { quantity } = this.props
            fetch("https://wod-with-faris-backend.herokuapp.com/users/buyclasspasses", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: quantity,
                    description: `${quantity}X Class Passes`, 
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
                
                const { quantity, userEmail } = this.props
                fetch("https://wod-with-faris-backend.herokuapp.com/users/addclasspasses", {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: quantity,
                    user_email: userEmail
                })
            }).then(
                setTimeout(() => {
                    this.setState({paymentSuccess: false})
                    this.props.toggleShow(false)
                    this.props.resetQuantity()
                }, 6000)
                )
            }
        }
    }

    render() {
        const { show, toggleShow, quantity } = this.props
        const { name, paymentSuccess, paymentError, paymentPending } = this.state
        return (
            <div>
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={false}
                        onClose={() => toggleShow(false)}
                        closeOnOverlay={false}>
                <div className='checkout-form'>
                    {paymentSuccess&&<p className='payment-success'>Payment Successful</p>}
                    {paymentError&&<p className='payment-error'>Error: {paymentError}</p>}
                {paymentSuccess?
                    <h1 className='payment-success'>Thank you! {this.props.quantity}X Class Passes have been added to your account!</h1>
                :
                <>
                    <div class="product-info">
                        <h3 className="product-title">{quantity === 1? "1X Class Pass": quantity + "X Class Passes"}</h3>
                        <h4 className="product-price">Total: CHF {quantity * 10}</h4>
                    </div>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input className='name-card-input' required value={name} onChange={this.handleNameChange} type='text' placeholder='Full Name as displayed on card'/>
                        <CardSection/>
                        {paymentPending? <button className='loading-spinner'> </button> : <button className="btn-pay">Buy Now</button>}
                    </form>
                </>
                }
                </div>
                </PopPop>
            </div>
        )
    }
}


