import Message from "../Message";
import { Dispatch, Action } from "redux";

interface BubbleState {
  data: Message;
}

export default interface ChatBubbleProps {
  message: Message;
  bubbleStyles: {
    userBubble: object;
    chatbubble: object;
    text: object;
  };
  bubblesCentered: boolean;
  dispatch: Dispatch<
    Action<
      | "robotItemChat/add"
      | "robotItemChat/fetch"
      | "robotItemChat/remove"
      | "robotItemChat/update"
    >
  >;
  loading: boolean;
  robotItemChat: BubbleState;
}
