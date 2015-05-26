import React from 'react'; 

import MessagesActions from '../../actions/ChatViewAction';
import MessagesStore from '../../stores/MessagesStore';

let ReplyBox = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
  },
  handleKeyDown: function(e) {
    if (e.keyCode === 13) {
      MessagesActions.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value);

      this.setState({
        value: ''
      });
    }
  },
  updateValue: function(e) {
    this.setState({
      value: e.target.value
    });
  },
  render: function () {
    return (
      <div className="reply-box">
        <input value={ this.state.value } onChange={ this.updateValue } onKeyDown={ this.handleKeyDown } className="reply-box__input" placeholder="Type message to reply.." />
        <span className="reply-box__tip">
          Press <span className="reply-box__tip__button">⏎</span> to send
        </span>
      </div>
    );
  }
});

export default ReplyBox;