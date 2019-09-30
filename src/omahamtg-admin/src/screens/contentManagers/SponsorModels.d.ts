export interface Sponsor {
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

export interface EditorState<T> {
  editId: number;
  mode: 'edit' | 'new';
  editView: Omit<T, 'id'>;
}
