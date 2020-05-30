import React, { Component } from "react";
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat:1,
            cheese:1,
            bacon:1
        },
        totalPrice: 0
    }
    
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad','1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price});
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
                <Route path={this.props.match.path + '/contact-data'} render={() => <ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}/>}/>
            </div>
        );
    }
}

export default Checkout;