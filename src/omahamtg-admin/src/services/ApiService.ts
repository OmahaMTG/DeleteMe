import { OmahaMTGSiteAxios } from './AxiosInstances';
import { IApiService } from './serviceContracts';
import { idlessEntity, entityBase, PagedSet } from '../screens/contentManagers/ContentManagerModels';

const buildApiService = <T extends entityBase>(url: string): IApiService<T> => {
  const http = OmahaMTGSiteAxios();
  const queryEntities = async (startIndex: number, stopIndex: number, filter: string) => {
    console.log(url);
    const result = await http.get<PagedSet<T>>(`${url}?skip=${startIndex}&take=${stopIndex - startIndex}&filter=${filter}`);
    return result.data;
  };

  const createEntity = async (entity: idlessEntity) => {
    const result = await http.post<T>(url, entity);
    return result.data;
  };

  const updateEntity = async (entityId: number, entity: idlessEntity) => {
    const result = await http.put<T>(`${url}/${entityId}`, entity);
    return result.data;
  };

  const deleteEntity = async (entityId: number, perm: boolean = false) => {
    await http.delete(`${url}/${entityId}?perm=${perm}`);
    return;
  };

  return { queryEntities, createEntity, updateEntity, deleteEntity };
};

export { buildApiService };
