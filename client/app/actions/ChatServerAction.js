var Dispatcher = require('../dispatchers/ChatDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ActionTypes = ChatConstants.ActionTypes;

var messageActions = {
  recieveMessage: (messageEvent) => {
    Dispatcher.handleServerAction({
      type: ActionTypes.SEND_MESSAGE,
      userID: messageEvent.userID,
      message: messageEvent.message,
      timestamp: messageEvent.timestamp
    });
  },
  recieveAllMessages: () => {

  }
};

module.exports = messageActions;