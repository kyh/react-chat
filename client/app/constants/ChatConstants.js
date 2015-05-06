var keyMirror = require('keymirror');

var Constants = {

  ActionTypes: keyMirror({
    CHANGE_CHAT_WINDOW: null,
    SEND_MESSAGE: null,
    RECEIVE_MESSAGE: null
  })

};

module.exports = Constants;
