var React = require('react');
var Header = require('./Header.react');
var UserList = require('./UserList.react');
var MessageBox = require('./MessageBox.react');

var ChatApp = React.createClass({
  render: function () {
    return (
      <div className="app">
        <UserList />
        <MessageBox />
      </div>
    );
  }
});

module.exports = ChatApp;