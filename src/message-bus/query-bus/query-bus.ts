import { QueryMessage } from '../../message/query-message';
import { ResponseMessage } from '../../message/response-message';
import { MessageBus } from '../message-bus';

export abstract class QueryBus extends MessageBus {
  abstract dispatch<P, R>(
    message: QueryMessage<P>,
  ): Promise<ResponseMessage<R>>;
}
