import { CommandMessage } from '../../message/command-message';
import { ResponseMessage } from '../../message/response-message';
import { MessageBus } from '../message-bus';

export abstract class CommandBus extends MessageBus {
  abstract dispatch<P, R>(
    message: CommandMessage<P>,
  ): Promise<ResponseMessage<R>>;
}
