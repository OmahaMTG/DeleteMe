interface meeting {
  id: number;
  title: string;
  templateId: number;
  publishStartTime?: Date;
  startTime?: Date;
  endTime?: Date;
  isDraft: boolean;
  tags: List<string>;
  vimeoId: number;
  hostId: number;
  bodyHost: string;
  bodySponsors: number;

  presentations: {
    id: number;
    title: string;
    details: string;
  }[];
}
