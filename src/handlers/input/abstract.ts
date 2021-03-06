export abstract class InputControllerContract<T extends string, V> {
  public abstract readonly type: T;
  public abstract readonly key: string;
  public abstract readonly value: V;
  public abstract readonly isDirty: boolean;
  public abstract updateTo(value: V): void;
  public abstract onUpdate(hook: () => void): this;
}
