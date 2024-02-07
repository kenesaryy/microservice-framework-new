import { MessageProps, Message } from './message';

export interface QueryMessageProps<P> extends MessageProps<P> {}

export class QueryMessage<P> extends Message<P, QueryMessageProps<P>> {
}
