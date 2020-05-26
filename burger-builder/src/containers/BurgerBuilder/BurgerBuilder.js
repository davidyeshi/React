import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
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
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }

        return(
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    disabled = {disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price = {this.state.totalPrice}
                />
            </>
        );
    }
}

export default BurgerBuilder;