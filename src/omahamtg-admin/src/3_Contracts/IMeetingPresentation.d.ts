import { IMeetingPresentationPresenter } from './IMeetingPresentationPresenter';
export interface IMeetingPresentation {
  id?: number;
  title: string;
  details: string;
  presenters: IMeetingPresentationPresenter[];
}
