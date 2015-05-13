import React from 'react';
import { Navigation } from 'react-router';


let Login = React.createClass({
  mixins: [Navigation],

  handleLogin() {
    console.log('Logging in');
    this.transitionTo('/chat');
  },

  render() {
    return(
      <div className="login-page">
        <div>Welcome to login</div>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
});

export default Login; 