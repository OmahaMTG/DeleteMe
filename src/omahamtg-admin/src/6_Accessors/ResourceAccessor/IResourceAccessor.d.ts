import { resourceBase, pagedSet } from '../../3_Contracts';

export interface IResourceAccessor<T extends resourceBase> {
  queryResources: (startIndex: number, stopIndex: number, filter: string) => Promise<pagedSet<T>>;
  createResource: (resource: Omit<T, 'id'>) => Promise<T>;
  updateResource: (resourceId: number, resource: Omit<T, 'id'>) => Promise<T>;
  deleteResource: (resourceId: number, perm: boolean) => Promise<void>;
}
