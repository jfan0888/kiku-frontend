import React from 'react';
import { MessageList } from 'react-chat-elements';

import 'react-chat-elements/dist/main.css';
const addIcon = require('../../assets/images/add.png');

class ChatWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="input-widget">
        <a className="add-btn">
          <img alt="add icon" src={addIcon} />
        </a>
        <MessageList
          className="messege-list"
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={[
            {
              position: 'right',
              type: 'text',
              text: 'Hey Mike, What do you think of my new song?',
              dateString: '2 mins ago',
            },
            {
              position: 'left',
              type: 'text',
              text: 'It Sucks.',
              dateString: '1 min ago',
            },
            {
              position: 'right',
              type: 'text',
              text: 'Thanks a lot.',
              dateString: 'just now',
            },
          ]}
        />
      </div>
    );
  }
}

export default ChatWidget;
