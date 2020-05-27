import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: .8
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0 
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    addIngredientHandler = (type) => {
        let count = this.state.ingredients[type];
        count++;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = count;
        const updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let count = this.state.ingredients[type];
        if (count <= 0) {
            return;
        }
        count--;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = count;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchaseable: sum > 0});
    }

    // if method is triggered through event then we have to use the
    // arraw functions, contains the state or contents of this
    togglePurchaseHandler = () => {
        const purchasing = this.state.purchasing;
        this.setState({purchasing: !purchasing});
    }

    purchaseContinueHandler = () => {
        
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({loading: false, purchasing: false})
            })
            .catch(err => {
                this.setState({loading: false, purchasing: false})
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }

        let orderSummary = <OrderSummary 
        cancelPurchase = {this.togglePurchaseHandler}
        continuePurchase = {this.purchaseContinueHandler}
        ingredients = {this.state.ingredients}
        totalPrice = {this.state.totalPrice}/>;

        if(this.state.loading) {
            orderSummary =  <Spinner />
        }
        return(
            <>
                <Modal modalClosed={this.togglePurchaseHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    disabled = {disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price = {this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.togglePurchaseHandler}
                />
            </>
        );
    }
}

export default BurgerBuilder;