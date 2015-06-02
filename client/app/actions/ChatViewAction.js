import Dispatcher from '../dispatchers/ChatDispatcher';
import ChatConstants from '../constants/ChatConstants';
import Socket from '../utils/WebUtils';
let ActionTypes = ChatConstants.ActionTypes;

let messagesActions = {
  changeOpenChat(newUserID) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_CHAT_WINDOW,
      userID: newUserID
    });
  },
  sendMessage(userID, message) {
    Dispatcher.dispatch({
      type: ActionTypes.SEND_MESSAGE,
      userID: userID,
      message: message,
      timestamp: +new Date()
    });
    // Socket.send(message);
  },
  login(name, email) {
    Socket.send(Socket.createLoginData(ActionTypes.LOGIN, name, email));
  }
};

export default messagesActions;