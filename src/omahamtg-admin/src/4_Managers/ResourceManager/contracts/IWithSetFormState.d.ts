import { resourceBase } from '../../../3_Contracts';
import { IResourceFormState } from './IResourceFormState';
import { Dispatch, SetStateAction } from 'react';
export interface IWithSetFormState<T extends resourceBase> {
  // setFormState: Dispatch<SetStateAction<IResourceFormState<T>>>;
  setFormState: Dispatch<SetStateAction<IResourceFormState<T>>>;
}
