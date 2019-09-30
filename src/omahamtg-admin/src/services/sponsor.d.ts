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
