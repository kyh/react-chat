var WebSocketServer = require('ws').Server;
var Config          = require('../config/base');

module.exports = function() {

  var wss = new WebSocketServer({
    port: Config.socketPort
  });

  console.log('Websocket listening on port ' + wss.options.port);

  wss.on('connection', function(ws) {

    console.log('User connected');
    ws.on('message', function(data) {
      var msg = JSON.parse(data);
      console.log(msg);
    });

  });

  wss.on('close', function close() {
    console.log('User disconnected');
  });

};