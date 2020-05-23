import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React App</h1>
        <Person name = "David" age = "24" />
        <Person name = "Mike" age = "21"> My hobbies: Racing</Person>
        <Person name = "Robert" age = "20"/>
      </div>
    );
  }
}

export default App;
