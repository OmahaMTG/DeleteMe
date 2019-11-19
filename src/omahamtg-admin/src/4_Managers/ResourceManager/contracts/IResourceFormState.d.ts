import { resourceBase } from '../../../3_Contracts';

export interface IResourceFormState<T extends resourceBase> {
  editId: number;
  mode: 'edit' | 'new';
  editView: Omit<T, 'id'>;
  state: 'idle' | 'saving';
}
