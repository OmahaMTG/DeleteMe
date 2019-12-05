import { IResourceCollectionState } from './contracts/IResourceCollectionState';
import { resourceBase } from '../../3_Contracts';

export const buildDefaultCollectionState = <T extends resourceBase>(): IResourceCollectionState<T> => {
  const defaultCollectionState: IResourceCollectionState<T> = {
    resultSet: {
      taken: 0,
      skipped: 0,
      records: [],
      totalRecords: 0
    },
    state: 'initializing',
    filter: '',
    appliedFilter: ''
  };
  return defaultCollectionState;
};
