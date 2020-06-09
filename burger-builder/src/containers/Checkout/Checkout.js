import React, { Component } from "react";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

   
    // Ingredients can be taken from redux now
    // componentWillMount() {
    //     // const query = new URLSearchParams(this.props.location.search);
    //     // const ingredients = {};
    //     // let price = 0;
    //     // for (let param of query.entries()) {
    //     //     // ['salad','1']
    //     //     if (param[0] === 'price') {
    //     //         price = param[1];
    //     //     } else {
    //     //         ingredients[param[0]] = +param[1];
    //     //     }
    //     // }

    //     // this.setState({ingredients: ingredients, totalPrice: price});
    //     console.log("[Checkout.js] Component Will Mount")
    // }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    };

    render() {
        let summary = <Redirect to="/"/>

        
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> :null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        continueCheckout = {this.continueCheckoutHandler}
                        cancelCheckout = {this.cancelCheckoutHandler}
                        ingredients={this.props.ings}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            ) 
        }
        return summary;
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);