import {
  container as globalContainer,
  Lifecycle,
  type DependencyContainer as TsyringeContainer,
  type InjectionToken,
} from 'tsyringe';

export type Token<T> = InjectionToken<T>;

export type Factory<T> = (container: DependencyContainer) => T;

export interface ResolveOptions<T> {
  useClass?: new (...args: any[]) => T;
  useFactory?: Factory<T>;
  useValue?: T;
}

export class DependencyContainer {
  private static instance: DependencyContainer;
  private readonly container: TsyringeContainer;

  private constructor(container: TsyringeContainer = globalContainer.createChildContainer()) {
    this.container = container;
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  private createChild(): DependencyContainer {
    return new DependencyContainer(this.container.createChildContainer());
  }

  public register<T>(token: Token<T>, factory: Factory<T>): void {
    this.container.register<T>(token, {
      useFactory: () => factory(this),
      lifecycle: Lifecycle.Singleton,
    });
  }

  public resolve<T>(token: Token<T>, options?: ResolveOptions<T>): T {
    if (!options) {
      return this.container.resolve<T>(token);
    }

    const child = this.createChild();

    if (options.useClass) {
      child.container.register<T>(token, {
        useClass: options.useClass,
        lifecycle: Lifecycle.Singleton,
      });
    } else if (options.useFactory) {
      child.container.register<T>(token, {
        useFactory: () => options.useFactory(child),
        lifecycle: Lifecycle.Singleton,
      });
    } else if (options.useValue !== undefined) {
      child.container.registerInstance<T>(token, options.useValue);
    }

    return child.container.resolve<T>(token);
  }
}
