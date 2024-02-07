import { QueryMessage } from '../message/query-message';

export interface QueryHandler<P, R> {
  handle(message: QueryMessage<P>): Promise<R>;
}
