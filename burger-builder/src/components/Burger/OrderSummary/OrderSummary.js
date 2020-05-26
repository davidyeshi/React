import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

// This can be a functional base component
class OrderSummary extends Component {
    
    componentDidUpdate() {
        console.log("[OrderSummary] Did Update");
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map((igKey, index) => {
            return (
            <li key={igKey+index}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li> );
        });

        return(
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </>
        );
    }
}

export default OrderSummary;