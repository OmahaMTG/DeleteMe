interface sponsor {
  id: number;
  name: string;
  blurb: string;
  contactInfo: string;
  shortBlurb: string;
  url: string;
}

export interface PagedSet<T> {
  skipped: number;
  taken: number;
  totalRecords: number;
  records: T[];
}

interface IApiService<T> {
  queryEntities: (startIndex: number, stopIndex: number, filter: string) => Promise<PagedSet<T>>;
  createEntity: (entity: Omit<T, 'id'>) => Promise<T>;
  updateEntity: (entityId: number, entity: Omit<T, 'id'>) => Promise<T>;
  deleteEntity: (entityId: number, perm: boolean) => Promise<void>;
}
