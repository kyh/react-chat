import Dispatcher from '../dispatchers/ChatDispatcher';
import ChatConstants from '../constants/ChatConstants';
let ActionTypes = ChatConstants.ActionTypes;

let messageActions = {
  recieveMessage(messageEvent) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_MESSAGE,
      userID: messageEvent.userID,
      message: messageEvent.message,
      timestamp: messageEvent.timestamp
    });
  },
  recieveAllMessages() {

  }
};

export default messageActions;