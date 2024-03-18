// Определение типа для функций обратного вызова событий
type EventCallback = (...args: unknown[]) => void;

export enum EventName {
  Logout = 'logout',
}

// Класс EventEmitter с использованием типа EventCallback
class EventEmitter {
  private events: { [key: string]: EventCallback[] } = {};

  public on(eventName: string, fn: EventCallback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }

  public emit(eventName: string, ...args: unknown[]) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((fn) => {
        fn(...args);
      });
    }
  }
}

export default new EventEmitter();
