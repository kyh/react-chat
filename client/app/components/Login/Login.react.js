import React from 'react';
import { Link } from 'react-router';


let Login = React.createClass({ 
  render() {
    return(
      <div className="login-page">
        <div>Welcome to login</div>
        <Link to="chat">Login</Link>
      </div>
    );
  }
});

export default Login; 