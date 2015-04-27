var Dispatcher = require('../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

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
  }
};

var openChatID = parseInt(Object.keys(messages)[0], 10);

var messagesStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback){
    this.addListener('change', callback);
  },
  removeChangeListener: function(callback){
    this.removeListener('change', callback);
  },
  getOpenChatUserID: function(){
    return openChatID;
  },
  getChatByUserID: function(id){
    return messages[id];
  },
  getAll: function(){
    return messages;
  }
});

messagesStore.dispatchToken = Dispatcher.register(function(payload){

});

module.exports = messagesStore;