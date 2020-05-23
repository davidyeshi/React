import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';

class App extends Component {

  // If state changes then REACT re-renders
  state = {
    persons: [
      {name: 'David', age:24},
      {name: 'Mike', age: 21},
      {name: 'Robert', age: 20}
    ],
    showPersons: false
  }

  // Change name handler
  // event object is automatically passed by react
  // target has the value that use entered
  nameChangedHandler = (event) => {
    this.setState({persons: [
      {name: 'Yeshi', age:24},
      {name: event.target.value, age: 21},
      {name: 'Robert', age: 20}
    ]});
  }

  togglePersonsHandler = () => {
    // Render dynamically
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

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
              key = {index}
              name = {person.name}
              age = {person.age}
              click = {this.deletePersonHandler.bind(this, index)}
              changed = {this.nameChangedHandler}
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
