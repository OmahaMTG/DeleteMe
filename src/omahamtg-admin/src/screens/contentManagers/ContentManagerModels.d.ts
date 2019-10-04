export interface PagedSet<T> {
  skipped: number;
  taken: number;
  totalRecords: number;
  records: T[];
}

export interface ListState<T> {
  resultSet: PagedSet<T>;
  state: 'initializing' | 'ready' | 'error';
  filter: string;
  appliedFilter: string;
}

export interface EditorState<T> {
  editId: number;
  mode: 'edit' | 'new';
  editView: Omit<T, 'id'>;
  editorMessage: string;
}
