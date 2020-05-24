import React from 'react';

import classes from './Person.css'; // Thanks to webpack we import css without merging the two files.

// Functional React Component
// props contains all the properties of the component
const person = (props) => {

    const rnd = Math.random();

    if (rnd > 0.5) {
        throw new Error('Something went wrong');
    }
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
}

export default person;