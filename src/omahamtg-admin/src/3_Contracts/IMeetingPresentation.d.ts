import { IMeetingPresentationPresenter } from './IMeetingPresentationPresenter';
export interface IMeetingPresentation {
  presentationId?: number;
  presentationTitle: string;
  presentationDetails: string;
  vimeoId?: string;
  meetingPresentationPresenters: IMeetingPresentationPresenter[];
}
