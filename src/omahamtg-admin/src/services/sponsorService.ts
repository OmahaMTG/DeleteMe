import { OmahaMTGSiteAxios } from './AxiosInstances';
import { start } from 'repl';

const http = OmahaMTGSiteAxios();

export const getSponsors = async (startIndex: number, stopIndex: number) => {
  const result: { name: string }[] = [];
  for (let index = startIndex; index < stopIndex; index++) {
    result.push({ name: `Thing ${index}` });
  }
  console.log('loading', { skipped: startIndex, taken: stopIndex - startIndex });
  return {
    skipped: startIndex,
    taken: stopIndex - startIndex,
    totalRecords: 1000,
    records: result
  };

  // const results = await http.get('sponsors');
  // const sponsors = results.data.body as {};

  // return sponsors;
};
