import { IResourceFormState } from './contracts/IResourceFormState';
import { resourceBase } from '../../3_Contracts';

export const buildDefaultFormState = <T extends resourceBase>(defaultResource: Omit<T, 'id'>): IResourceFormState<T> => {
  const defaultCollectionState: IResourceFormState<T> = {
    editId: 0,
    editView: defaultResource,
    mode: 'new',
    state: 'idle'
  };
  return defaultCollectionState;
};
