import assign from 'object-assign';
import ChatConstants from '../constants/ChatConstants';
let ActionTypes = ChatConstants.ActionTypes;

import MessagesStore from './MessagesStore';
import Dispatcher from '../dispatchers/ChatDispatcher';
import { EventEmitter } from 'events';

let openChatID = null;
let threads = {};

const ThreadStore = assign({}, EventEmitter.prototype, {
  init(threads) {
    threads = threads;
  },
  addChangeListener(callback) {
    this.addListener('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },
  getOpenChatUserID() {
    return openChatID;
  }
});

const threadStoreActions = {
  [ActionTypes.CHANGE_CHAT_WINDOW]: (payload) => {
    openChatID = payload.userID;
    messages[openChatID].lastAccess.currentUser = +new Date();
    ThreadStore.emit('change');
  }
};