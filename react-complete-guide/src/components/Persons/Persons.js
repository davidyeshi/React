import React, { PureComponent } from 'react';
import Person from './Person/Person';
import AuthContext from '../../context/auth-context';

// Pure component executes only if props changes
class Persons extends PureComponent {

    // Lifecycle hook
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // Lifecycle hook
    // Do we want to update ?
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');

    //     // if persons don't change then don't render
    //      if (nextProps.persons !== this.props.persons || 
    //          nextProps.changed !== this.props.changed ||
    //          nextProps.clicked !== this.props.clicked) {
    //         return true;
    //      } else {
    //         return false;
    //      }
    // }

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

    // Lifecycle hook
    // for running code right before component is removed for cleanup
    componentWillMount() {
        console.log('[Persons.js] componentWillMount');
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            <AuthContext.Consumer>
            {(context) => this.props.persons.map((person, index) => {
            return (
                <Person 
                key = {person.id}
                name = {person.name}
                age = {person.age}
                isAuth = {context.authenticated}
                click = {this.props.clicked.bind(this, index)}
                changed = {(event) => this.props.changed(event, person.id)}
                />);
        })}
        </AuthContext.Consumer>
        );
    }
}

export default Persons;