import { CommandMessage } from '../message/command-message';

export interface CommandHandler<P, R> {
  handle(message: CommandMessage<P>): Promise<R>;
}
