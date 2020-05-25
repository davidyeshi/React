import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    // Dynamically set class names dynamically
    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.persons.length <=1) {
        assignedClasses.push(classes.bold);
    }

    return(
        <div className={classes.Cockpit}>
            <h1>React App</h1>
            <p className = {assignedClasses.join(' ')}>This is working</p>
            <button className={btnClass}
            // Alternative way of binding 
            onClick = {props.clicked}>Toggle Persons
            </button>
        </div>
    );
}

export default cockpit;