import React from 'react'; 
import ReplyBox from './ReplyBox.react';
import Velocity from 'velocity-animate';
import marked from 'marked';

import MessagesStore from '../../stores/MessagesStore';
import UserStore from '../../stores/UserStore';
import DateUtils from '../../utils/DateUtils';

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
    var storeMessages = this.state.messages;

    var messages = storeMessages.map(function(message, index) {
      var messageFromCurrentUser = message.from === currentUserID;
      var messageThumbnail = (messageFromCurrentUser) ? UserStore.user.profilePicture : this.state.user.profilePicture;
      var fromSameUser = false;
      var messageProperties;

      if (storeMessages[index - 1]) {
        if (storeMessages[index - 1].from === message.from) {
          fromSameUser = true;
        }
      }

      if (!fromSameUser) {
        let ts = DateUtils.getShortDate(message.timestamp);
        let author = (messageFromCurrentUser) ? UserStore.user.name : this.state.user.name;
        let messageStyle = {
          backgroundImage: `url(${messageThumbnail})`
        };

        messageProperties = (
          <div className="message-box__item__properties">
            <div className="message-box__item__thumbnail" style={ messageStyle } />
            <author>{ author }</author>
            <time>{ ts }</time>
          </div>
        );
      }

      var messageClasses = React.addons.classSet({
        'message-box__item': true,
        'message-box__item--no-padding': fromSameUser
      });

      return (
        <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
          { messageProperties }
          <div
            className="message-box__item__contents"
            dangerouslySetInnerHTML={{
              __html: marked(message.contents, {sanitize: true})
            }}
          />
        </li>
      );
    }, this);

    var lastMessage = this.state.messages[messagesLength -1];

    if (lastMessage.from === currentUserID) {
      if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
        var date = DateUtils.getShortDate(lastMessage.timestamp);
        messages.push(
          <div key="read" className="message-box__item--read">
            Read { date }
          </div>
        );
      }
    }

    return (
      <div className="message-box">
        <ul className="message-box__list" ref="messageList">
          { messages }
        </ul>
        <ReplyBox />
      </div>
    );
  }
});

export default MessageBox;