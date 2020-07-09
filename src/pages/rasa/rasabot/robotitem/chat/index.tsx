import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { ChatFeed, Message } from './components';
import styles from './style.less';

// const pStyles = {
//   button: {
//     backgroundColor: '#fff',
//     borderColor: '#1D2129',
//     borderStyle: 'solid',
//     borderRadius: 20,
//     borderWidth: 2,
//     color: '#1D2129',
//     fontSize: 18,
//     fontWeight: '300',
//     paddingTop: 8,
//     paddingBottom: 8,
//     paddingLeft: 16,
//     paddingRight: 16,
//   },
//   selected: {
//     color: '#fff',
//     backgroundColor: '#0084FF',
//     borderColor: '#0084FF',
//   },
// };

const users = {
  0: 'You',
  Mark: 'Mark',
  2: 'Evan',
};

const customBubble = (props: any) => (
  <div>
    <p>{`${props.message.senderName} ${props.message.id ? 'says' : 'said'}: ${
      props.message.message
    }`}</p>
  </div>
);

class ChatView extends React.Component<any, any> {
  message: any;

  props: any;

  state = {
    messages: [
      new Message({
        id: 1,
        message: "I'm the recipient! (The person you're talking to)",
      }), // Gray bubble
      new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
    ],
    useCustomBubble: false,
    curr_user: 0,
    is_typing: true,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      messages: [
        new Message({ id: 'Mark', message: 'Hey guys!', senderName: 'Mark' }),
        new Message({
          id: 2,
          message: 'Hey! Evan here. react-chat-ui is pretty dooope.',
          senderName: 'Evan',
        }),
      ],
      useCustomBubble: false,
      curr_user: 0,
      is_typing: false,
    };
  }

  componentDidMount(): void {}

  onPress(user: any) {
    this.setState({ curr_user: user });
  }

  onMessageSubmit(e: any): boolean {
    const input = this.message;
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    this.pushMessage(this.state.curr_user, input.value);
    input.value = '';
    return true;
  }

  pushMessage(recipient: any, message: any): void {
    const prevState = this.state;
    const newMessage = new Message({
      id: recipient,
      message,
      senderName: users[recipient],
    });
    prevState.messages.push(newMessage);
    const { state } = this;
    this.setState(state);
  }

  // <ChatFeed
  // messages={this.state.messages}
  // isTyping={this.state.is_typing}
  // hasInputField={false}
  // showSenderName
  // bubblesCentered={false}
  // bubbleStyles={{
  //   text: {
  //     fontSize: 15,
  //   },
  //   chatbubble: {
  //     borderRadius: 10,
  //     padding: 10,
  //   },
  // }}
  // />
  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <div className={styles.container}>
            <div className={styles.chatfeedWrapper}>
              <ChatFeed
                chatBubble={this.state.useCustomBubble && customBubble}
                maxHeight={250}
                messages={this.state.messages} // Boolean: list of message objects
                showSenderName
              />
              <form onSubmit={e => this.onMessageSubmit(e)}>
                <input
                  ref={m => {
                    this.message = m;
                  }}
                  placeholder="Type a message..."
                  className={styles.messageinput}
                />
              </form>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ChatView;
