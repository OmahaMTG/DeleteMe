import { resourceBase, pagedSet } from '../../../3_Contracts';

export interface IResourceCollectionState<T extends resourceBase> {
  resultSet: pagedSet<T>;
  state: 'initializing' | 'ready' | 'error';
  filter: string;
  appliedFilter: string;
}
