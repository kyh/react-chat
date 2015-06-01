import assign from 'object-assign';
import ChatConstants from '../constants/ChatConstants';
let ActionTypes = ChatConstants.ActionTypes;

import UserStore from './UserStore';
import Dispatcher from '../dispatchers/ChatDispatcher';
import { EventEmitter } from 'events';

// Will need to pull these messages in from server
var messages = {};
var openChatID = null;

const MessagesStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },
  getOpenChatUserID() {
    return openChatID;
  },
  getChatByUserID(id) {
    return messages[id];
  },
  getAllChats() {
    return messages;
  }
});

const messageStoreActions = {
  [ActionTypes.CHANGE_CHAT_WINDOW]: (payload) => {
    openChatID = payload.userID;
    messages[openChatID].lastAccess.currentUser = +new Date();
    MessagesStore.emit('change');
  },
  [ActionTypes.SEND_MESSAGE]: (payload) => {
    var userID = payload.userID;
    var currentUser = messages[userID];

    currentUser.lastAccess.currentUser = +new Date();
    currentUser.messages.push({
      contents: payload.message,
      timestamp: payload.timestamp,
      from: UserStore.user.id
    });

    MessagesStore.emit('change');
  },
  [ActionTypes.RECEIVE_MESSAGE]: (payload) => {

  },
  [ActionTypes.RECEIVE_ALL_MESSAGES]: (payload) => {
    messages = payload.connections;
    openChatID = parseInt(Object.keys(messages)[0], 10);
  }
};

MessagesStore.dispatchToken = Dispatcher.register((payload) => {
  messageStoreActions[payload.type] && messageStoreActions[payload.type](payload);
});

export default MessagesStore;