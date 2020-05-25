import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {

    // Lifecycle hook
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // Lifecycle hook
    // Do we want to update ?
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    // Lifecycle hook
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return null;
    }

    // Lifecycle hook
    // Can perform http requests here
    componentDidUpdate() {
        console.log('[Persons.js] componentDidUpdate');
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            this.props.persons.map((person, index) => {
            return (
                <Person 
                key = {person.id}
                name = {person.name}
                age = {person.age}
                click = {this.props.clicked.bind(this, index)}
                changed = {(event) => this.props.changed(event, person.id)}
                />)
        }));
    }
}
export default Persons;