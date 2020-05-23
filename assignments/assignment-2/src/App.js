import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

  state = {
    input: ""
  }

  deleteCharHandler = (event, index) => {
    const input = this.state.input.split('');
    input.splice(index,1);

    this.setState({input: input.join('')});
  }

  countInputHandler = (event) => {
    this.setState({
      input : event.target.value
    })
  }

  render() {

    let chars = null;
    if (this.state.input.length>0) {
      chars = this.state.input.split('').map((char, index) => {
        return <CharComponent 
                key={index} 
                click={(event) => this.deleteCharHandler(event, index)} 
                letter = {char}/>
      })
    } 

    return (
      <div className="App">
        <input onChange={(event) => this.countInputHandler(event)} value = {this.state.input}/>
        <p>Text Length: {this.state.input.length}</p>
        <ValidationComponent length = {this.state.input.length}/>
        {chars}
      </div>
    );
  }
}

export default App;
