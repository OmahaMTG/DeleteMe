import { resourceBase } from '../../../3_Contracts';
import { IResourceCollectionState } from './IResourceCollectionState';
export interface IResourceCollectionManager<T extends resourceBase> {
  isResourceLoaded: (index: number) => boolean;
  loadMoreResources: (startIndex: number, stopIndex: number) => Promise<void>;
  updateSearchFilter: (value: string) => void;
  applySearchFilter: () => void;
  clearSearchFilter: () => void;
  collectionState: IResourceCollectionState<T>;
}
