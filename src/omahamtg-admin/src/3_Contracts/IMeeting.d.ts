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
  meetingHostId?: number;
  meetingHostBody: string;
  meetingPresentations: IMeetingPresentation[];
  meetingSponsors: IMeetingSponsor[];
}
