import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  // Lifecycle hook
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  // Lifecycle hook
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[App.js] getDerivedStateFromProps', props);
  //   return state;
  // }

  // Lifecycle hook
  // can be used for http request
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  // Lifecycle hook
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  // Lifecycle hook
  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  // If state changes then REACT re-renders
  state = {
    persons: [
      {id:'123123', name: 'David', age:24},
      {id:'fasf14', name: 'Mike', age: 21},
      {id:'safawe413', name: 'Robert', age: 20}
    ],
    showPersons: false,
    showCockpit: true
  }

  // Change name handler
  // event object is automatically passed by react
  // target has the value that use entered
  nameChangedHandler = (event, id) => {
    // get the person index
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    console.log(personIndex);

    // find and copy the person
    const person = {
      ...this.state.persons[personIndex]
    }

    // update the name on change
    person.name = event.target.value;

    // copy the array of persons from the state
    const persons = [...this.state.persons];

    // set the updated person to the persons array
    persons[personIndex] = person;

    // update the persons array in the state
    this.setState({persons: persons});
    
  }

  // Toggle persons
  togglePersonsHandler = () => {
    // Render dynamically
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  // Delete a person
  deletePersonHandler = (personIndex) => {
    // copies the full array, so now we are safe to mutate state
    // const persons = [...this.state.persons];
    const persons = this.state.persons.slice();

    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {

    let persons = null;    
    // render persons if showPersons is true
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons persons = {this.state.persons} clicked = {this.deletePersonHandler} changed = {this.nameChangedHandler}/>
        </div>
      );
    }

    return (
        <div className={classes.App}>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
          {this.state.showCockpit ? <Cockpit 
            persons = {this.state.persons} 
            clicked = {this.togglePersonsHandler}
            showPersons = {this.state.showPersons}/>:null}
          {persons}
        </div>
    );
  }
}

export default App;
