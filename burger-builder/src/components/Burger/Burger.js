import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    // Transform ingredients object into array
    const arrayIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // Mapping through the number of ingredients
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey+1} type = {igKey}/>
            })
        });


    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {arrayIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger