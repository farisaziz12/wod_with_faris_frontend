import React, { Component } from "react";
import ReactGA from "react-ga";
import "./BuyPasses.css";
import { loadStripe } from "@stripe/stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_live_4g3t1ZRoe5slZQbs5Vy3IaGe00fOR9THIq");

export default class BuyPasses extends Component {
  state = {
    quantity: 0,
    purchaseAmountLimit: false,
    show: false,
  };

  handleQuantityChange = (amount) => {
    const { quantity } = this.state;
    if (quantity > 0 && quantity < 5) {
      this.setState({
        quantity: quantity + amount,
        purchaseAmountLimit: false,
      });
    } else if (quantity === 0 && amount === 1) {
      this.setState({ quantity: 1, purchaseAmountLimit: false });
    } else if (quantity === 5 && amount === -1) {
      this.setState({
        quantity: quantity + amount,
        purchaseAmountLimit: false,
      });
    } else if (quantity === 5) {
      this.setState({ purchaseAmountLimit: true });
    }
    ReactGA.event({
      category: "User",
      action: `${amount}X classes was added to the cart.`,
    });
  };

  resetQuantity = () => {
    this.setState({ quantity: 0 });
  };

  toggleShow = (show) => {
    if (this.state.quantity > 0) {
      this.setState({ show: show });
    } else if (this.state.quantity === 0) {
      window.alert("Quantity of class passes must be more than 0");
    }

    ReactGA.event({
      category: "User",
      action: `Checkout button was hit`,
    });
  };

  render() {
    const { quantity, purchaseAmountLimit } = this.state;
    return (
      <div>
        <h1>Buy Passes</h1>
        <div className="purchase-box">
          <div>
            <h1 className="quantity-title">Class Passes</h1>
            {purchaseAmountLimit && (
              <p className="limit">Purchase limit is 5 classes</p>
            )}
            <h1 className="quantity">{quantity}</h1>
            <div className="buttons-container">
              <button
                className="quantity-btn"
                onClick={() => this.handleQuantityChange(-1)}
              >
                -
              </button>
              <button
                className="quantity-btn"
                onClick={() => this.handleQuantityChange(1)}
              >
                +
              </button>
            </div>
            <h1 className="total">Total: CHF {quantity * 15}</h1>
            <button
              onClick={() => this.toggleShow(true)}
              className="checkout-btn"
            >
              Checkout
            </button>
            <Elements stripe={stripePromise}>
              <ElementsConsumer>
                {({ stripe, elements }) => (
                  <CheckoutForm
                    resetQuantity={this.resetQuantity}
                    userEmail={this.props.currentUser.email}
                    show={this.state.show}
                    toggleShow={this.toggleShow}
                    quantity={quantity}
                    stripe={stripe}
                    elements={elements}
                  />
                )}
              </ElementsConsumer>
            </Elements>
          </div>
        </div>
      </div>
    );
  }
}
