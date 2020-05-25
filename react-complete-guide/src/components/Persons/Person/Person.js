import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import classes from './Person.css'; // Thanks to webpack we import css without merging the two files.

// Functional React Component
// props contains all the properties of the component
class Person extends Component {

    render(){
        return (
            <Aux className={classes.Person}>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </Aux>
        );
    }
}

export default Person;