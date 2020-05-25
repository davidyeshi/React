import React, {useEffect, useRef} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

    // Setup reference
    const toggleButtonRef = useRef(null);
    // React Hook, executes on every render cycle
    // Can be used for http requests..
    // Only running when props.persons changes
    // To run only one time, pass an empty array
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // setTimeout(() => {
        //     alert('Saved Data to cloud!');
        // },1000);
        toggleButtonRef.current.click();
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
            ref={toggleButtonRef}
            // Alternative way of binding 
            onClick = {props.clicked}>Toggle Persons
            </button>
            <AuthContext.Consumer>
                {(context) => <button onClick={context.login}>Log in</button>}
            </AuthContext.Consumer>
        </div>
    );
}

// only render if input(props) changes 
export default React.memo(cockpit);