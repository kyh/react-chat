var Dispatcher = require('../dispatchers/dispatcher');
var Socket = require('../utils/socket');

var messagesActions = {
  changeOpenChat: function(newUserID) {
    Dispatcher.handleViewAction({
      type: 'updateOpenChatID',
      userID: newUserID
    });
  },
  sendMessage: function(userID, message) {
    Dispatcher.handleViewAction({
      type: 'sendMessage',
      userID: userID,
      message: message,
      timestamp: +new Date()
    });
    // console.log(Socket);
    Socket.send(message);
  }
};

module.exports = messagesActions;