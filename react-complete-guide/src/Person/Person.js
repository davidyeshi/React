import React from 'react';

// Functional React Component
// props contains all the properties of the component
const person = (props) => {
    return <p>I'm {props.name} and I am {props.age} years old!</p>
}

export default person;