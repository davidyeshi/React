import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    // Transform ingredients object into array
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // Mapping through the number of ingredients
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey+1} type = {igKey}/>
            })
        })
        // flatten arrays to create one array
        .reduce((arr, el) => {
            // take the element add to the empty array
            return arr.concat(el);
        }, []);
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger