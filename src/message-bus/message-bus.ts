import { GeneralHandler } from '../handler/types';

export abstract class MessageBus {
  abstract subscribe<H extends GeneralHandler>(
    messageUniqueName: string,
    handler: H,
  ): Promise<void>;
}
