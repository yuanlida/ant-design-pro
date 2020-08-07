import React, { Component, Fragment } from "react";
import ChatBubbleProps from "./interface";
import { Button, Dropdown, Menu, Icon } from "antd";
import styles from "./styles";
import { Dispatch, Action } from "redux";
import { connect } from "dva";

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {}
};

interface Message {
  id: string;
  message: string;
  type: string;
}

interface BubbleState {
  data: Message;
}
@connect(
  ({
    robotItemChat,
    loading
  }: {
    robotItemChat: BubbleState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    robotItemChat,
    loading: loading.models.robotItemChat
  })
)
export default class ChatBubble extends Component<
  ChatBubbleProps,
  BubbleState
> {
  // props;

  componentDidMount(): void {
    const { dispatch } = this.props;
    console.log(this);
    dispatch({
      type: "robotItemChat/fetch"
    });
  }

  handleDropDownSelect(menuItem: string) {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: "robotItemChat/update",
        payload: {
          id: "",
          message: this.props.message.message,
          type: menuItem
        }
      });
    }
  }

  renderDropDown() {
    if (this.props.message.id === 0) {
      return (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="Entities">
                <Button onClick={() => this.handleDropDownSelect("entity")}>
                  Add Entity
                </Button>
              </Menu.Item>
              <Menu.Item key="Synonyms">
                <Button onClick={() => this.handleDropDownSelect("synonym")}>
                  Add Synonym
                </Button>
              </Menu.Item>
              <Menu.Item key="Intents">
                <Button onClick={() => this.handleDropDownSelect("intent")}>
                  Change Intent
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <a>. . .</a>
        </Dropdown>
      );
    } else {
      return (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="Responses">
                <Button onClick={() => this.handleDropDownSelect("response")}>
                  Change Response
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <a>. . .</a>
        </Dropdown>
      );
    }
  }

  public render() {
    const { bubblesCentered } = this.props;
    let { bubbleStyles } = this.props;
    bubbleStyles = bubbleStyles || defaultBubbleStyles;
    const { userBubble, chatbubble, text } = bubbleStyles;

    // message.id 0 is reserved for blue
    const chatBubbleStyles =
      this.props.message.id === 0
        ? {
            ...styles.chatbubble,
            ...(bubblesCentered ? {} : styles.chatbubbleOrientationNormal),
            ...chatbubble,
            ...userBubble
          }
        : {
            ...styles.chatbubble,
            ...styles.recipientChatbubble,
            ...(bubblesCentered
              ? {}
              : styles.recipientChatbubbleOrientationNormal),
            ...chatbubble,
            ...userBubble
          };
    const dropDownStyle: any =
      this.props.message.id === 0
        ? {
            ...styles.dropdownRight
          }
        : {
            ...styles.dropdownLeft
          };

    return (
      <div
        style={{
          ...styles.chatbubbleWrapper
        }}
      >
        <div style={chatBubbleStyles}>
          <p style={{ ...styles.p, ...text }}>{this.props.message.message}</p>
        </div>
        <div style={dropDownStyle}>{this.renderDropDown()}</div>
      </div>
    );
  }
}

export { ChatBubbleProps };
