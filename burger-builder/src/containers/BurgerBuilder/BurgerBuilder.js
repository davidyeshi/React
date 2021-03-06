import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log("ComponentDidMount:::"+this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        // this.setState({purchaseable: sum > 0});
        return sum > 0;
    }

    // if method is triggered through event then we have to use the
    // arraw functions, contains the state or contents of this
    togglePurchaseHandler = () => {
        if (this.props.isAuth) {
            const purchasing = this.state.purchasing;
            this.setState({purchasing: !purchasing});
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push('/auth');
        }
    }

    purchaseContinueHandler = () => {
        
        // No longer needed since we are passing ingredients with redux
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     // encode URI helps in passing to url
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); 
        // }

        // queryParams.push('price=' + this.props.price);

        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push('/checkout');    
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p>:<Spinner />

        if (this.props.ings) {
            burger = (
                <>
                <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        disabled = {disabledInfo}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onDeleteIngredient}
                        price = {this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        isAuth={this.props.isAuth}
                        ordered={this.togglePurchaseHandler}
                    />
                </>
            );

            orderSummary = <OrderSummary 
            cancelPurchase = {this.togglePurchaseHandler}
            continuePurchase = {this.purchaseContinueHandler}
            ingredients = {this.props.ings}
            totalPrice = {this.props.price}/>
        }
        // if(this.state.loading) {
        //     orderSummary =  <Spinner />
        // }
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ingName) => dispatch(actions.addIngredient(ingName)),
        onDeleteIngredient : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));