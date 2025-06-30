export type Factory<T> = (container: DependencyContainer) => T;

export type Token<T> = symbol & { __type: T };

export class DependencyContainer {
  private static instance: DependencyContainer;

  private factories: Map<Token<unknown>, Factory<unknown>> = new Map();
  private instances: Map<Factory<unknown>, unknown> = new Map();

  private constructor() {}

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  public register<T>(token: Token<T>, factory: Factory<T>): void {
    this.factories.set(token, factory);
    this.instances.set(factory, undefined);
  }

  public resolve<T>(token: Token<T>): T {
    const factory = this.factories.get(token) as Factory<T>;

    if (!factory) {
      throw new Error(`Token ${String(token)} not found`);
    }

    const instance = this.instances.get(factory) as T | undefined;

    if (instance !== undefined) {
      return instance;
    }

    const newInstance = factory(this);
    this.instances.set(factory, newInstance);
    return newInstance;
  }
}
