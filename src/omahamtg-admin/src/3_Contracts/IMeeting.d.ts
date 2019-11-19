import { IMeetingSponsor } from './IMeetingSponsor';
import { IMeetingPresentation } from './IMeetingPresentation';

export interface IMeeting {
  id: number;
  title: string;
  templateId?: number;
  publishStartTime?: string;
  startTime?: string;
  endTime?: string;
  isDraft: boolean;
  tags: string[];
  vimeoId: string;
  hostId?: number;
  hostBody: string;
  presentations: IMeetingPresentation[];
  sponsors: IMeetingSponsor[];
}
