import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <div>
                <CheckoutSummary 
                    continueCheckout = {this.continueCheckoutHandler}
                    cancelCheckout = {this.cancelCheckoutHandler}
                    ingredients={this.state.ingredients}/>
            </div>
        );
    }
}

export default Checkout;