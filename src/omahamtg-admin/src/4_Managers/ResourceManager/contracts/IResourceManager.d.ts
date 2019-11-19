import { resourceBase } from '../../../3_Contracts';
import { IResourceFormManager } from './IResourceFormManager';
import { IResourceCollectionManager } from './IResourceCollectionManager';

export interface IResourceManager<T extends resourceBase> {
  resourceFormManager: IResourceFormManager<T>;

  resourceCollectionManager: IResourceCollectionManager<T>;
}
