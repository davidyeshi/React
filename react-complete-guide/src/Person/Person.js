import React from 'react';

import './Person.css'; // Thanks to webpack we import css without merging the two files.

// Functional React Component
// props contains all the properties of the component
const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
}

export default person;