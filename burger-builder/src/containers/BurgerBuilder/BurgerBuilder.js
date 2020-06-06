import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: .8
}

class BurgerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error:null
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data});
        //     })
        //     .catch(err => {
        //         this.setState({error:true})
        //     })
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
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            // encode URI helps in passing to url
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); 
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });    
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner />

        if (this.props.ings) {
            burger = (
                <>
                <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        disabled = {disabledInfo}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onDeleteIngredient}
                        price = {this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.togglePurchaseHandler}
                    />
                </>
            );

            orderSummary = <OrderSummary 
            cancelPurchase = {this.togglePurchaseHandler}
            continuePurchase = {this.purchaseContinueHandler}
            ingredients = {this.props.ings}
            totalPrice = {this.state.totalPrice}/>
        }
        if(this.state.loading) {
            orderSummary =  <Spinner />
        }
        return(
            <>
                <Modal modalClosed={this.togglePurchaseHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onDeleteIngredient : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));