import { Message, MessageProps } from './message';

export interface ResponseMessageProps<P> extends MessageProps<P> {
  readonly sourceMessageID: string;
}

export class ResponseMessage<P> extends Message<P, ResponseMessageProps<P>> {
}
