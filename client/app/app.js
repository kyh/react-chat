require('../assets/scss/app.scss');

var React = require('react');
var ChatApp = require('./components/ChatApp.react');

React.render(<ChatApp />, document.body);

if (module.hot) {
  module.hot.accept();
}
