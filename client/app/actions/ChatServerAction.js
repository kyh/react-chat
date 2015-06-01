import Dispatcher from '../dispatchers/ChatDispatcher';
import ChatConstants from '../constants/ChatConstants';
let ActionTypes = ChatConstants.ActionTypes;

let messageActions = {
  recieveMessage(messageEvent) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_MESSAGE,
      userID: messageEvent.userID,
      message: messageEvent.message,
      timestamp: +new Date()
    });
  },
  recieveAllMessages(messageEvent) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_ALL_MESSAGES,
      connections: messageEvent.connections,
    });
  }
};

export default messageActions;