var Dispatcher = require('../dispatchers/ChatDispatcher');

var messageActions = {
  recieveMessage: function(messageEvent) {
    Dispatcher.handleServerAction({
      type: ActionTypes.SEND_MESSAGE,
      userID: messageEvent.userID,
      message: messageEvent.message,
      timestamp: messageEvent.timestamp
    });
  }
};

module.exports = messageActions;