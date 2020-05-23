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
    ]
  }

  // method for switching name as an event handler on button click
  switchNameHandler = (newName) => {
    console.log('Was Clicked!');
    this.setState({persons: [
      {name: newName, age:24},
      {name: 'Mike', age: 21},
      {name: 'Robert', age: 20}
    ]});
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

  render() {
    return (
      <div className="App">
        <h1>React App</h1>
        
        <button 
        // Alternative way of binding 
        onClick = {() => this.switchNameHandler('Yeshi Minda!')}>Switch Name</button>
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
      </div>
    );
  }
}

export default App;
