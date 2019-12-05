import { axiosInstance } from './axiosInstance';

export interface pagedSet<T> {
  skipped: number;
  taken: number;
  totalRecords: number;
  records: T[];
}

const buildLookupAccessor = <T>(url: string) => {
  const http = axiosInstance();

  const queryLookup = async (filter: string) => {
    const result = await http.get<pagedSet<T>>(`${url}?skip=${0}&take=${50}&filter=${filter}`);
    return result.data.records;
  };

  return { queryLookup };
};

export { buildLookupAccessor };
