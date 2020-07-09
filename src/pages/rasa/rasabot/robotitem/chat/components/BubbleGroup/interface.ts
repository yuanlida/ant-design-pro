import { Message, ChatBubble } from '../index';

export default interface BubbleGroupInterface {
  messages: [Message];
  id: number;
  showSenderName: boolean;
  chatBubble: ChatBubble;
}
