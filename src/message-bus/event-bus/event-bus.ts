import { EventMessage } from '../../message/event-message';
import { MessageBus } from '../message-bus';

export abstract class EventBus extends MessageBus {
  abstract dispatch<P>(
    message: EventMessage<P>,
  ): Promise<void>;
}
