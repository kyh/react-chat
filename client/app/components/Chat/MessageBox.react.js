import React from 'react'; 
import ReplyBox from './ReplyBox.react';
import VelocityTransitionGroup from '../ReactUtils/VelocityTransition.react';
import Velocity from 'velocity-animate';

import MessagesStore from '../../stores/MessagesStore';
import UserStore from '../../stores/UserStore';
import utils from '../../utils/utils';

function getStateFromStore() {
  return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID());
}

let MessageBox = React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },
  componentWillMount: function() {
    MessagesStore.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount: function() {
    MessagesStore.removeChangeListener(this.onStoreChange);
  },
  onStoreChange: function() {
    this.setState(getStateFromStore());
  },
  componentDidUpdate: function() {
    var $messageList = this.refs.messageList.getDOMNode();
    Velocity($messageList.lastElementChild, 'scroll', {
      container: $messageList,
      duration: 700,
      easing: 'linear'
    });
  },
  render: function() {
    var messagesLength = this.state.messages.length;
    var currentUserID = UserStore.user.id;

    var messages = this.state.messages.map(function(message, index) {
      var messageClasses = React.addons.classSet({
        'message-box__item': true,
        'message-box__item--from-current': message.from === currentUserID
      });

      return (
        <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
          <div className="message-box__item__contents">
            { message.contents }
          </div>
        </li>
      );
    });

    var lastMessage = this.state.messages[messagesLength -1];

    if (lastMessage.from === currentUserID) {
      if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
        var date = utils.getShortDate(lastMessage.timestamp);
        messages.push(
          <li key="read" className="message-box__item message-box__item--read">
            <div className="message-box__item__contents">
              Read { date }
            </div>
          </li>
        );
      }
    }

    return (
      <div className="message-box">
        <VelocityTransitionGroup className="message-box__list" transitionName="slideup" component="ul" ref="messageList">
          { messages }
        </VelocityTransitionGroup>
        <ReplyBox />
      </div>
    );
  }
});

export default MessageBox;