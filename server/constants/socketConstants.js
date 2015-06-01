var keyMirror = require('keymirror');

var Constants = {
  ActionTypes: keyMirror({
  	loggedIn: null,
    recieveMessage: null,
    recieveAllMessages: null
  })
};

module.exports = Constants;
