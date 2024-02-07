import { PartialOptional } from '../base/types';
import { UUID } from '../base/uuid';

export interface MessageProps<P> {
  readonly id: string,
  readonly uniqueName: string,
  readonly timeStamp: number,
  readonly payload: P,
  readonly source: string,
  readonly metadata: Record<string, unknown>,
}

export abstract class Message<P, PROPS extends MessageProps<P>> {
  protected props: PROPS;

  constructor(
    props: PartialOptional<PROPS, 'id' | 'timeStamp'>,
  ) {
    this.props = {
      ...props as Exclude<PROPS, { id: string, timeStamp: number }>,
      id: props.id || UUID.create().getRawUuid(),
      timeStamp: props.timeStamp || new Date(),
    };
  }

  getPayload(): P {
    return this.props.payload;
  }

  getId(): string {
    return this.props.id;
  }

  getTimestamp(): number {
    return this.props.timeStamp;
  }

  getSource(): string {
    return this.props.source;
  }

  getMetadata(): Record<string, unknown> {
    return this.props.metadata;
  }

  getUniqueName(): string {
    return this.props.uniqueName;
  }
}
