import { CommandMessage } from './command-message';
import { EventMessage } from './event-message';
import { Message, MessageProps } from './message';
import { QueryMessage } from './query-message';

export type GeneralMessage = Message<unknown, MessageProps<unknown>>;

export type HandlableMessage<P> = QueryMessage<P> | CommandMessage<P> | EventMessage<P>;

export type GeneralHandlableMessage = HandlableMessage<unknown>;
