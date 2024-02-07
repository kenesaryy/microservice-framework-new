import { UUID } from '../base/uuid';
import { GeneralMessage } from '../message/types';
import { Phase } from './phase';
import { Subscriber } from './subscriver';

export class UnitOfWork<M extends GeneralMessage> {
  protected phase: Phase;

  protected readonly subscribers: Map<Phase, Set<Subscriber>> = new Map();

  protected constructor(
    protected readonly id: UUID,
    protected readonly message: M,
    protected readonly parent?: UnitOfWork<GeneralMessage>,
    phase?: Phase, 
  ) {
    this.phase = phase || Phase.NOT_STARTED;
  }

  static create<M extends GeneralMessage>(
    message: M,
    parent?: UnitOfWork<GeneralMessage>,
  ): UnitOfWork<M> {
    return new UnitOfWork(
      UUID.create(),
      message,
      parent
    );
  }

  async start(): Promise<void> {
    if (this.phase !== Phase.NOT_STARTED) throw new Error(); // TODO
    await this.nextPhase();
  }

  async commit(): Promise<void> {
    if (this.phase !== Phase.STARTED) throw new Error(); // TODO
    await this.nextPhase(); // Before commit
    await this.nextPhase(); // After commit
  }

  async rollback(): Promise<void> {
    if (this.phase !== Phase.STARTED) throw new Error(); // TODO
    await this.nextPhase();
  }

  async close(): Promise<void> {
    if (this.phase !== Phase.AFTER_COMMIT
      && this.phase !== Phase.ROLLED) throw new Error();
    this.phase = Phase.CLOSED;
    await this.notifySubscribers(this.phase);
  }

  subscribe(phase: Exclude<Phase, Phase.NOT_STARTED>, subscriber: Subscriber): void {
    if (this.phase === Phase.CLOSED) throw new Error(); // TODO
    const subscribersSet = this.subscribers.get(phase) || new Set();
    subscribersSet.add(subscriber);
    this.subscribers.set(phase, subscribersSet);
  }

  getParent(): UnitOfWork<GeneralMessage> | undefined {
    return this.parent;
  }

  getMessage(): M {
    return this.message;
  }

  protected async notifySubscriber(subscriber: Subscriber): Promise<void> {
    await subscriber(this);
  }

  protected async notifySubscribers(subscribers: Set<Subscriber>): Promise<void>;
  protected async notifySubscribers(phase: Phase): Promise<void>;

  protected async notifySubscribers(arg: Phase | Set<Subscriber>): Promise<void> {
    if (typeof arg === 'object') {
      const all = Array.from(arg.values()).map((subscriber) => this.notifySubscriber(subscriber));
      await Promise.all(all);
    } else {
      const phase = arg;
      await this.notifySubscribers(this.subscribers.get(phase) || new Set());
      this.subscribers.set(phase, new Set());
    }
  }

  protected async nextPhase(): Promise<void> {
    if (this.phase === Phase.CLOSED) throw new Error(); // TODO
    this.phase = this.phase + 1;
    await this.notifySubscribers(this.phase);
  }
}