var WebSocketServer = require('ws').Server;
var Config          = require('../config/base');

module.exports = function() {

    var wss = new WebSocketServer({
        port: Config.socketPort
    });

    wss.on('connection', function(ws) {
        console.log('user connected');
        ws.on('message', function(data) {
            var msg = JSON.parse(data);
            console.log(msg);
        });
    });


};