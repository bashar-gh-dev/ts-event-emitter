export type Subscription = { unsubscribe: () => void };
export type EventHandler<T> = (value: T) => void;
export type Next<T> = (value: T) => void;
export type Subscribe<T> = (handler: EventHandler<T>) => Subscription;
export type Emitter<T> = {
  emit: Next<T>;
  toObservable: () => Observable<T>;
  subscribe: Subscribe<T>;
};
export type Observable<T> = Omit<Emitter<T>, "emit" | "toObservable">;
