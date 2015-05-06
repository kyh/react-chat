var Dispatcher = require('../dispatchers/ChatDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var Socket = require('../utils/socket');

var ActionTypes = ChatConstants.ActionTypes;

var messagesActions = {
  changeOpenChat: function(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CHANGE_CHAT_WINDOW,
      userID: newUserID
    });
  },
  sendMessage: function(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE,
      userID: userID,
      message: message,
      timestamp: +new Date()
    });
    // console.log(Socket);
    // Socket.send(message);
  }
};

module.exports = messagesActions;