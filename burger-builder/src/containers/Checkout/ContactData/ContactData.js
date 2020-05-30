import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    
    state = {
        name : '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }

    orderHandler = (event) => {
        // we don't want to send a request which is the default
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'David',
                address: {
                    street: 'Some Test Street',
                    zipCode: '4523',
                    country: 'Australia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false})
            });
    }

    render () {
        let form = (
            <form>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Your Email"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postalCode" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your contact data: </h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);