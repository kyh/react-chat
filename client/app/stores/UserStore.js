import assign from 'object-assign';
import ChatConstants from '../constants/ChatConstants';
let ActionTypes = ChatConstants.ActionTypes;

import Dispatcher from '../dispatchers/ChatDispatcher';
import { EventEmitter } from 'events';

var currentUser = {};

const UserStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.addListener('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },
  getCurrentUser() {
    return currentUser;
  },
  getCurrentUserID() {
    return currentUser.id;
  }
});

const userStoreActions = {
  [ActionTypes.LOGIN]: (payload) => {
    currentUser = payload.currentUser;
    UserStore.emit('change');
  }
};

UserStore.dispatchToken = Dispatcher.register((payload) => {
  userStoreActions[payload.type] && userStoreActions[payload.type](payload);
});

export default UserStore;