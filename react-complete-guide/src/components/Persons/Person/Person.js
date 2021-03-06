import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';
import classes from './Person.css'; // Thanks to webpack we import css without merging the two files.

// Functional React Component
// props contains all the properties of the component
class Person extends Component {

    constructor(props) {
        super(props);
        // definging ref
        this.inputElementRef = React.createRef();
    }

    // Automatically connects to the context
    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log("Context.authenticated: " + this.context.authenticated);
    }

    render(){
        return (
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p>:<p>Please login</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    // ref={(inputEl) => {this.inputElement = inputEl}} 
                    ref = {this.inputElementRef}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}/>
            </Aux>
        );
    }
}

Person.PropTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);