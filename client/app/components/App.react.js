import React from 'react'; 
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import LoginHandler from './Login/Login.react.js';
import ChatHandler from './Chat/Chat.react.js';

let App = React.createClass({  
  render() {
    return (
      <RouteHandler/>
    );
  }
});

let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={ChatHandler} />
    <Route name="login" path="/login" handler={LoginHandler}/>
    <Route name="chat" path="/chat" handler={ChatHandler}/>
  </Route>
);

let Routes = {
  init() {
    Router.run(routes, Router.HistoryLocation, function(Handler) {  
      React.render(<Handler/>, document.body);
    }); 
  }
}

export default Routes;