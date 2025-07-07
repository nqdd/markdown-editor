import { useContext } from 'react';
import { DependencyContainerContext } from '../providers/dependency-container';

export function useDependencyContainer() {
  const container = useContext(DependencyContainerContext);
  if (!container) {
    throw new Error('DependencyContainerContext is not provided');
  }
  return container;
}
