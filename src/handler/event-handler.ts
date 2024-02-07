import { EventMessage } from '../message/event-message';

export interface EventHandler<P> {
  handle(message: EventMessage<P>): Promise<void>;
}
