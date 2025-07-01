import type { InjectionToken } from 'tsyringe';

export const createToken = <T>(name: string): InjectionToken<T> => {
  return name as unknown as InjectionToken<T>;
};
