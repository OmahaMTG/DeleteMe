import { axiosInstance } from '../axiosInstance';
import { IResourceAccessor } from './IResourceAccessor';
import { resourceBase, pagedSet } from '../../3_Contracts';

const buildResourceAccessor = <T extends resourceBase>(url: string): IResourceAccessor<T> => {
  const http = axiosInstance();

  const queryResources = async (startIndex: number, stopIndex: number, filter: string) => {
    const result = await http.get<pagedSet<T>>(`${url}?skip=${startIndex}&take=${stopIndex - startIndex}&filter=${filter}`);
    return result.data;
  };

  const createResource = async (resource: Omit<T, 'id'>) => {
    const result = await http.post<T>(url, resource);
    return result.data;
  };

  const updateResource = async (resourceId: number, resource: Omit<T, 'id'>) => {
    const result = await http.put<T>(`${url}/${resourceId}`, resource);
    return result.data;
  };

  const deleteResource = async (resourceId: number, perm: boolean) => {
    await http.delete(`${url}/${resourceId}?perm=${perm}`);
    return;
  };

  const getResource = async (resourceId: number) => {
    const result = await http.get<T>(`${url}/${resourceId}`, { validateStatus: status => status < 500 });
    if (result.status === 404) {
      return undefined;
    }
    return result.data;
  };

  return { queryResources, createResource, updateResource, deleteResource, getResource };
};

export { buildResourceAccessor };
