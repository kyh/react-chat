var keyMirror = require('keymirror');

var Constants = {
  ActionTypes: keyMirror({
  	login: null,
    recieveMessage: null,
    recieveAllMessages: null
  })
};

module.exports = Constants;
