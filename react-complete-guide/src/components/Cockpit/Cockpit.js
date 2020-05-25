import React, {useEffect} from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {

    // React Hook, executes on every render cycle
    // Can be used for http requests..
    // Only running when props.persons changes
    // To run only one time, pass an empty array
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        setTimeout(() => {
            alert('Saved Data to cloud!');
        },1000);
        // runs clean up based on the condition in the param
        return () => {
            console.log('[Cockpit.js] cleanup useEffect');
        };
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] 2nd cleanup useEffect')
        };
    });

    // Dynamically set class names dynamically
    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.personsLength <=1) {
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

// only render if input(props) changes 
export default React.memo(cockpit);