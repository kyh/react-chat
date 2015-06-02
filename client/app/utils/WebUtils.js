import ChatServerAction from '../actions/ChatServerAction';

let WS;
let Socket = {
  init() {
    WS = new WebSocket("ws://localhost:1337/ws");

    WS.onclose = function(e) {
      console.log('socket closed');
    };

    WS.onopen = function(e) {
      console.log('socket opened');
    };

    WS.onmessage = function(e){
      let message = JSON.parse(e.data);
      ChatServerAction[message.type] && ChatServerAction[message.type](message.data);
    };
  },
  createLoginData(type, name, email) {
    return {
      type: type,
      data: {
        name: name,
        email: email
      }
    };
  },
  send(message) {
    WS.send(JSON.stringify(message));
  }
};

export default Socket;