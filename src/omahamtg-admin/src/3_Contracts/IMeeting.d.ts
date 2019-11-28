import { IMeetingSponsor } from './IMeetingSponsor';
import { IMeetingPresentation } from './IMeetingPresentation';

export interface IMeeting {
  id: number;
  title: string;
  templateId: number | null;
  publishStartTime?: string;
  startTime?: string;
  endTime?: string;
  isDraft: boolean;
  tags: string[];
  vimeoId: string;
  meetingHostId: number | null;
  meetingHostBody: string;
  meetingPresentations: IMeetingPresentation[];
  meetingSponsors: IMeetingSponsor[];
}
