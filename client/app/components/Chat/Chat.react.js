import React from 'react';
import Header from './Header.react';
import UserList from './UserList.react';
import MessageBox from './MessageBox.react';

var ChatApp = React.createClass({
  render() {
    return (
      <div className="app">
        <UserList />
        <MessageBox />
      </div>
    );
  }
});

export default ChatApp;