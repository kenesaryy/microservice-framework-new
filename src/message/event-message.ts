import { Message, MessageProps } from './message';

export interface EventMessageProps<P> extends MessageProps<P> {
  readonly sourceType: string;
  readonly sourceID: string;
}

export class EventMessage<P> extends Message<P, EventMessageProps<P>> {
  getSourceType(): string {
    return this.props.sourceType;
  }

  getSourceID(): string {
    return this.props.sourceID;
  }
}
