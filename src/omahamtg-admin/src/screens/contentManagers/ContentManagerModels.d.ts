export interface PagedSet<T extends entityBase> {
  skipped: number;
  taken: number;
  totalRecords: number;
  records: T[];
}

export interface ListState<T extends entityBase> {
  resultSet: PagedSet<T>;
  state: 'initializing' | 'ready' | 'error';
  filter: string;
  appliedFilter: string;
}

// export interface ListState<T> {
//   resultSet: PagedSet<T>;
//   state: 'initializing' | 'ready' | 'error';
//   filter: string;
//   appliedFilter: string;
// }

export interface EditorState<T extends entityBase> {
  editId: number;
  mode: 'edit' | 'new';
  editView: Omit<T, 'id'>;
  editorMessage: string;
}

type entityBase = {
  id: number;
};

export interface entityEditor<T extends entityBase> {
  updateEntityContent: (key: string, value: string | boolean) => void;
  saveEntity: () => Promise<void>;
  deleteEntity: () => Promise<void>;
  formState: EditorState;
}

export interface entityCollection<T extends entityBase> {
  isEntityLoaded: (index: number) => boolean;
  loadMoreEntities: (startIndex: number, stopIndex: number) => Promise<void>;
  updateSearchFilter: (value: string) => void;
  applySearchFilter: () => void;
  clearSearchFilter: () => void;
  listState: ListState<T>;
}

export interface entityProvider<T extends entityBase> {
  entityCollection: entityCollection<T>;
  entityEditor: entityEditor<T>;
}
