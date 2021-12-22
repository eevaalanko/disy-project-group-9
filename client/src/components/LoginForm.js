import React from 'react'
//import {useState} from 'react'
//import getItems from "../hooks/GetItems";
//import getUsers from "../hooks/GetUsers";
//import {io} from "socket.io-client";



class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {username: '', password: ''};
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;
    
        this.setState({
          [name]: event.target.value
        });
      }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.username);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
          </label>
          <label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Login" />
        </form> 
      );
    }
  }

  export default LoginForm