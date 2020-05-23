import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';

class App extends Component {

  // If state changes then REACT re-renders
  state = {
    persons: [
      {id:'123123', name: 'David', age:24},
      {id:'fasf14', name: 'Mike', age: 21},
      {id:'safawe413', name: 'Robert', age: 20}
    ],
    showPersons: false
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
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;
    
    // render persons if showPersons is true
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              key = {person.id}
              name = {person.name}
              age = {person.age}
              click = {this.deletePersonHandler.bind(this, index)}
              changed = {(event) => this.nameChangedHandler(event, person.id)}
              />
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>React App</h1>
        
        <button 
        // inline style
        style = {style}
        // Alternative way of binding 
        onClick = {this.togglePersonsHandler}>Toggle Persons</button>

        {persons}

      </div>
    );
  }
}

export default App;
