var assign = require('object-assign');
var ChatConstants = require('../constants/ChatConstants');
var ActionTypes = ChatConstants.ActionTypes;

var UserStore = require('../stores/UserStore');
var Dispatcher = require('../dispatchers/ChatDispatcher');
var EventEmitter = require('events').EventEmitter;

// Will need to pull these messages in from server
var messages = {
  2: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clark',
      status: 'online'
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080
    },
    messages: [
      {
        contents: 'Hey!',
        from: 2,
        timestamp: 1424469793023
      },
      {
        contents: 'Hey, what\'s up?',
        from: 1,
        timestamp: 1424469794000
      }
    ]
  },
  3: {
    user: {
      read: true,
      profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
      name: 'Jilles Soeters',
      id: 3,
      status: 'online'
    },
    lastAccess: {
      recipient: 1424352522000,
      currentUser: 1424352522080
    },
    messages: [
      {
        contents: 'Want a game of ping pong?',
        from: 3,
        timestamp: 1424352522000
      }
    ]
  },
  4: {
    user: {
      name: 'Todd Motto',
      id: 4,
      profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
      status: 'online'
    },
    lastAccess: {
      recipient: 1424423579000,
      currentUser: 1424423574000
    },
    messages: [
      {
        contents: 'Please follow me on twitter I\'ll pay you',
        timestamp: 1424423579000,
        from: 4
      }
    ]
  }
};

var openChatID = parseInt(Object.keys(messages)[0], 10);

var messagesStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.addListener('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },
  getOpenChatUserID: function() {
    return openChatID;
  },
  getChatByUserID: function(id) {
    return messages[id];
  },
  getAllChats: function() {
    return messages;
  }
});

var messageStoreActions = {
  [ActionTypes.CHANGE_CHAT_WINDOW]: (payload) => {
    openChatID = payload.action.userID;
    messages[openChatID].lastAccess.currentUser = +new Date();
    messagesStore.emit('change');
  },
  [ActionTypes.SEND_MESSAGE]: (payload) => {
    var userID = payload.action.userID;
    var currentUser = messages[userID];

    currentUser.lastAccess.currentUser = +new Date();
    currentUser.messages.push({
      contents: payload.action.message,
      timestamp: payload.action.timestamp,
      from: UserStore.user.id
    });

    messagesStore.emit('change');
  }
};

messagesStore.dispatchToken = Dispatcher.register((payload) => {
  messageStoreActions[payload.action.type] && messageStoreActions[payload.action.type](payload);
});

module.exports = messagesStore;