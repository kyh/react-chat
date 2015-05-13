import React from 'react'; 
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import LoginHandler from './Login/Login.react.js';
import ChatHandler from './Chat/Chat.react.js';

let App = React.createClass({  
  render() {
    return (
      <div className="nav">
        <Link to="app">Home</Link>
        <Link to="login">Login</Link>
        <Link to="chat">Chat</Link>

        <RouteHandler/>
      </div>
    );
  }
});

let routes = (  
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={LoginHandler}/>
    <Route name="chat" path="/chat" handler={ChatHandler}/>
  </Route>
);

export function RouterInit(){
  Router.run(routes, Router.HistoryLocation, function(Handler) {  
    React.render(<Handler/>, document.body);
  });
}