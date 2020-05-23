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

  // method for switching name as an event handler on button click
  switchNameHandler = (newName) => {
    console.log('Was Clicked!');
    this.setState(
      {
        persons: [
          {name: newName, age:24},
          {name: 'Mike', age: 21},
          {name: 'Robert', age: 20}
        ]
       });
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
          {this.state.persons.map(person => {
            return <Person 
              name = {person.name}
              age = {person.age}
              click = {this.switchNameHandler.bind(this, 'Minda')}
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
