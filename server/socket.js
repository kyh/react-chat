var WebSocketServer = require('ws').Server;
var Config          = require('../config/base');
var Constants       = require('./constants/socketConstants');
var ActionTypes     = Constants.ActionTypes;

var connectedUsers = {
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

const MessageFromClient = {
  'LOGIN': function(name, email, id) {
    this.send(SocketService.createLoginUser(name, email, id));
  }
};

const SocketService = {
  createLoginUser: function(name, email, id) {
    var sendData = {
      type: ActionTypes.loggedIn,
      data: {
        user: name,
        id: id,
        profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200'
      }
    };
    return JSON.stringify(sendData);
  }
};

module.exports = function() {

  var wss = new WebSocketServer({
    port: Config.socketPort
  });

  console.log('Websocket listening on port ' + wss.options.port);

  wss.on('connection', function(ws) {
    console.log('User connected');
    ws.send(JSON.stringify({
      type: ActionTypes.recieveAllMessages,
      connections: connectedUsers
    }));
    
    ws.on('message', function(data) {
      var msg = JSON.parse(data);
      console.log(msg);
      MessageFromClient[msg.type] && MessageFromClient[msg.type].call(ws, msg.data);
    });

  });

  wss.on('close', function close() {
    console.log('User disconnected');
  });

};