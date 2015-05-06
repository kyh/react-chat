var ChatViewAction = require('../actions/ChatViewAction');
var ChatServerAction = require('../actions/ChatServerAction');

var ws = new WebSocket("ws://localhost:1337/ws");

ws.onclose = function(e) {
  console.log('socket closed');
};

ws.onopen = function(e) {
  console.log('socket opened');
};

ws.onmessage = function(e){
  console.log('Message from server', e.data);
  // emit action
};

module.exports = ws;