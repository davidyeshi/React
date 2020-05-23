import React, { useState } from 'react';
import './App.css';

import Person from './Person/Person';

// Making functional component to use state
const app = props => {

  // React Hook useState returns two elem, 
  // 1st elem is the current state and 
  // second elem is the function that allows us to update the state
  const [personsState, setPersonsState] = useState({
    persons: [
      {name: 'David', age: 24},
      {name: 'Michael', age: 21},
      {name: 'Robert', age: 20}
    ],
    otherState: 'some other value'  
  });

  // We can have as many use states as required
  const [otherState, setOtherState] = useState('some other value');

  console.log(personsState, otherState);

  const switchNameHandler = () => {

    // Set persons state will remove the previous state
    setPersonsState({
      persons: [
        {name: 'Yeshi', age: 24},
        {name: 'Michael', age: 21},
        {name: 'Robert', age: 20}
      ]
    })
  }

  return (
    <div className="App">
      <h1>React App</h1>
      <button onClick = {switchNameHandler}>Switch Name</button>
      <Person name = {personsState.persons[0].name} age = {personsState.persons[0].age} />
      <Person name = {personsState.persons[1].name}  age = {personsState.persons[1].age}> My hobbies: Racing</Person>
      <Person name = {personsState.persons[2].name}  age = {personsState.persons[2].age} />
    </div>
  );
}

export default app;
