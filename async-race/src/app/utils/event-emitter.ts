import { EventValue, EventHandler } from '../components/view/common-types';

class EventEmitter {
  private events = new Map<string, EventHandler[]>();

  public on(event: string, handler: EventHandler): void {
    let handlers: EventHandler[] | undefined = this.events.get(event);
    if (handlers === undefined) {
      handlers = [];
      this.events.set(event, handlers);
    }
    handlers.push(handler);
  }

  public emit(event: string, value: EventValue): void {
    const handlers: EventHandler[] | undefined = this.events.get(event);

    if (handlers) {
      handlers.forEach((handler) => handler(value));
    }
  }
}

export default EventEmitter;
