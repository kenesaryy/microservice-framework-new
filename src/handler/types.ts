import { CommandHandler } from './command-handler';
import { EventHandler } from './event-handler';
import { QueryHandler } from './query-handler';

export type GeneralHandler = CommandHandler<unknown, unknown>
| QueryHandler<unknown, unknown>
| EventHandler<unknown>;
