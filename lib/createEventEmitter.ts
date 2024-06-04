import { EventHandler, Observable, Emitter, Subscription } from "./types";

export function createEventEmitter<T = void>(): Emitter<T> {
  const subscribers = new Map<symbol, EventHandler<T>>();

  function subscribe(handle: EventHandler<T>): Subscription {
    const subscriptionId = Symbol();

    const subscription: Subscription = {
      unsubscribe: function () {
        subscribers.delete(subscriptionId);
      },
    };

    subscribers.set(subscriptionId, handle);

    return subscription;
  }

  function emit(value: T) {
    subscribers.forEach((handle) => {
      handle(value);
    });
  }

  function toObservable(): Observable<T> {
    return {
      subscribe,
    };
  }

  return {
    emit,
    subscribe,
    toObservable,
  };
}
