import { OmahaMTGSiteAxios } from './AxiosInstances';

const http = OmahaMTGSiteAxios();

export const getSponsors = async () => {
  const results = await http.get('sponsors');
  const sponsors = results.data.body as {};

  return sponsors;
};
