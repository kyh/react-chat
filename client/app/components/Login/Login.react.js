import React from 'react';
import { Navigation } from 'react-router';


let Login = React.createClass({
  mixins: [Navigation],

  handleLogin(e) {
    e.preventDefault();
    this.transitionTo('/chat');
  },

  render() {
    return(
      <div className="login-page">
        <form className="login-form" onSubmit={this.handleLogin}>
          <div>
            <span className="login-form__icon"></span>
            <input className="login-form__input" type="text" placeholder="Name" required />
          </div>
          <div>
            <span className="login-form__icon"></span>
            <input className="login-form__input" type="email" placeholder="Email" required />
          </div>
          <input className="login-form__submit" type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
});

export default Login; 