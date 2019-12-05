export interface pagedSet<T extends resourceBase> {
  skipped: number;
  taken: number;
  totalRecords: number;
  records: T[];
}

export interface resourceBase {
  id: number;
}

// export type OmitId<T> = Pick<T, Exclude<T, 'id'>>;

export type asyncStates = 'waiting' | 'pending' | 'resolved' | 'error';
