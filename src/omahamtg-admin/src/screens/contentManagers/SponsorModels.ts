export interface Sponsor {
  name: string;
}

export interface PagedSet<T> {
  skipped: number;
  taken: number;
  totalRecords: number;
  records: T[];
}

export const defaultSponsorPage: PagedSet<Sponsor> = {
  taken: 0,
  skipped: 0,
  records: [],
  totalRecords: 0
};
