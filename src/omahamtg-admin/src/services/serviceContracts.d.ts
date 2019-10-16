import { entityBase } from '../screens/contentManagers/ContentManagerModels';

interface IApiService<T extends entityBase> {
  queryEntities: (startIndex: number, stopIndex: number, filter: string) => Promise<PagedSet<T>>;
  createEntity: (entity: idlessEntity) => Promise<T>;
  updateEntity: (entityId: number, entity: idlessEntity) => Promise<T>;
  deleteEntity: (entityId: number, perm: boolean) => Promise<void>;
}
