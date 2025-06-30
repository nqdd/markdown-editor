import { Token } from './container';

export const createToken = <T>(name: string): Token<T> => {
  return Symbol(name) as Token<T>;
};
