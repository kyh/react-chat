import keyMirror from 'keymirror';

let Constants = {

  ActionTypes: keyMirror({
  	LOGIN: null,
    CHANGE_CHAT_WINDOW: null,
    SEND_MESSAGE: null,
    RECEIVE_MESSAGE: null,
    RECEIVE_ALL_MESSAGES: null
  })

};

export default Constants;
