import { MessageProps, Message } from './message';

export interface CommandMessageProps<P> extends MessageProps<P> {}

export class CommandMessage<P> extends Message<P, CommandMessageProps<P>> {
}
