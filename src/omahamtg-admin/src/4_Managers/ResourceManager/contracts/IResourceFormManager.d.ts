import { resourceBase } from '../../../3_Contracts';
import { IResourceFormState } from './IResourceFormState';
export interface IResourceFormManager<T extends resourceBase> {
  updateResourceProperty: <K extends keyof T>(changeEvent: { name: K; value?: T[K] }) => void;
  saveResource: () => Promise<void>;
  deleteResource: () => Promise<void>;
  formState: IResourceFormState<T>;
  formMessage: string | undefined;
}
