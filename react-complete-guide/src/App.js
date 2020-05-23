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

    return (
      <div className="App">
        <h1>React App</h1>
        
        <button 
        // inline style
        style = {style}
        // Alternative way of binding 
        onClick = {this.togglePersonsHandler}>Toggle Persons</button>

        {this.state.showPersons ?<div>
          <Person 
            name = {this.state.persons[0].name} 
            age = {this.state.persons[0].age} />
          <Person 
            name = {this.state.persons[1].name}  
            age = {this.state.persons[1].age}
            // binding method between components (Recommended)
            click = {this.switchNameHandler.bind(this, 'Minda')}
            changed = {this.nameChangedHandler}> My hobbies: Racing</Person>
          <Person 
            name = {this.state.persons[2].name}  
            age = {this.state.persons[2].age} />
        </div> : null}
      </div>
    );
  }
}

export default App;
