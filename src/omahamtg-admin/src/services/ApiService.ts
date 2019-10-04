import { OmahaMTGSiteAxios } from './AxiosInstances';
import { PagedSet, IApiService } from './serviceContracts';

const buildApiService = <T>(url: string): IApiService<T> => {
  const http = OmahaMTGSiteAxios();
  const queryEntities = async (startIndex: number, stopIndex: number, filter: string) => {
    const result = await http.get<PagedSet<T>>(`${url}?skip=${startIndex}&take=${stopIndex - startIndex}&filter=${filter}`);
    return result.data;
  };

  const createEntity = async (entity: Omit<T, 'id'>) => {
    const result = await http.post<T>(url, entity);
    return result.data;
  };

  const updateEntity = async (entityId: number, entity: Omit<T, 'id'>) => {
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
