import Sponsors from './Sponsors';

export interface Sponsor {
  id: number;
  name: string;
  blurb: string;
  contactInfo: string;
  shortBlurb: string;
  url: string;
}

export type FormState = 'Waiting' | 'Submitting' | 'Error';

export interface PagedSet<T> {
  skipped: number;
  taken: number;
  totalRecords: number;
  records: T[];
}

export type CreateSponsorRequest = Omit<Sponsor, 'id'>;
export type UpdateSponsor = Sponsor;

export const defaultSponsorPage: PagedSet<Sponsor> = {
  taken: 0,
  skipped: 0,
  records: [],
  totalRecords: 0
};
