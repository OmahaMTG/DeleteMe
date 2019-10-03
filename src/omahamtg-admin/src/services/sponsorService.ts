import { OmahaMTGSiteAxios } from './AxiosInstances';
import { PagedSet, sponsor } from './sponsor';
// import { PagedSet } from '../screens/contentManagers/SponsorModels';

// import { OmahaMTGSiteAxios } from './AxiosInstances';

const http = OmahaMTGSiteAxios();

// export const getSponsors = async (startIndex: number, stopIndex: number) => {
//   const result: { name: string; id: number; blurb: string; contactInfo: string; shortBlurb: string; url: string }[] = [];
//   for (let index = startIndex; index < stopIndex + 1; index++) {
//     result.push({
//       name: `Thing ${index}`,
//       id: index,
//       blurb: `Thing Blurb ${index}`,
//       contactInfo: `Thing Contact Info ${index}`,
//       shortBlurb: `Thing Short Blurb ${index}`,
//       url: `Thing URL ${index}`
//     });
//   }
//   console.log('loading', { skipped: startIndex, taken: stopIndex - startIndex + 1 });
//   return {
//     skipped: startIndex,
//     taken: stopIndex - startIndex + 1,
//     totalRecords: 150,
//     records: result
//   };

//   // const results = await http.get('sponsors');
//   // const sponsors = results.data.body as {};

//   // return sponsors;
// };

export const getSponsors = async (startIndex: number, stopIndex: number, filter: string) => {
  const result = await http.get<PagedSet<sponsor>>(`/sponsor?skip=${startIndex}&take=${stopIndex - startIndex}&filter=${filter}`);
  return result.data;
};

export const createSponsor = async (sponsor: Omit<sponsor, 'id'>) => {
  const result = await http.post<sponsor>('/sponsor', sponsor);
  return result.data;
};

export const updateSponsor = async (sponsorId: number, sponsor: Omit<sponsor, 'id'>) => {
  const result = await http.put<sponsor>(`/sponsor/${sponsorId}`, sponsor);
  return result.data;
};

export const deleteSponsor = async (sponsorId: number, perm: boolean = false) => {
  const result = await http.delete<sponsor>(`/sponsor/${sponsorId}?perm=${perm}`);
  return result.data;
};
