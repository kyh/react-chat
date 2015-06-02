var keyMirror = require('keymirror');

var Constants = {
  ActionTypes: keyMirror({
  	loggedIn: null,
    recieveMessage: null,
    newUser: null
  })
};

module.exports = Constants;
