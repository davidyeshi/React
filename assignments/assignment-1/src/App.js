import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';


class App extends Component {

  state = {
    username: 'davidyeshi'
  }

  changeUsernameHandler = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  render() {

    const style = {
      backgroundColor: 'salmon',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
    }

    return (
      <div className="App">
          <UserOutput username = {this.state.username}/>
          <UserInput style={style} change = {this.changeUsernameHandler.bind(this)} username = {this.state.username} />
      </div>
    );
  }
}

export default App;
