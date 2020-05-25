import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import Authcontext from '../context/auth-context';

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
    showCockpit: true,
    changeCounter: 0,
    autheticated: false
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
    this.setState((prevState, props) => {
      return{
        persons: persons,
        changeCounter: prevState.changeCounter + 1};
      });
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

  // Login Handler
  loginHandler = () => {
    this.setState({autheticated: true});
  }

  render() {

    let persons = null;    
    // render persons if showPersons is true
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons isAuthenticated = {this.state.autheticated} persons = {this.state.persons} clicked = {this.deletePersonHandler} changed = {this.nameChangedHandler}/>
        </div>
      );
    }

    return (
        <Aux>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
          <Authcontext.Provider value={{authenticated: this.state.autheticated, login: this.loginHandler}}>
          {this.state.showCockpit ? <Cockpit 
            personsLength = {this.state.persons.length} 
            clicked = {this.togglePersonsHandler}
            showPersons = {this.state.showPersons}/>:null}
          {persons}
          </Authcontext.Provider>
        </Aux>
    );
  }
}

export default withClass(App, classes.App);
