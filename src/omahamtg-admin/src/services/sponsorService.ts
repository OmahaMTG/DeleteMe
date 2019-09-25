// import { OmahaMTGSiteAxios } from './AxiosInstances';

// const http = OmahaMTGSiteAxios();

export const getSponsors = async (startIndex: number, stopIndex: number) => {
  const result: { name: string; id: number; blurb: string; contactInfo: string; shortBlurb: string; url: string }[] = [];
  for (let index = startIndex; index < stopIndex + 1; index++) {
    result.push({
      name: `Thing ${index}`,
      id: index,
      blurb: `Thing Blurb ${index}`,
      contactInfo: `Thing Contact Info ${index}`,
      shortBlurb: `Thing Short Blurb ${index}`,
      url: `Thing URL ${index}`
    });
  }
  console.log('loading', { skipped: startIndex, taken: stopIndex - startIndex + 1 });
  return {
    skipped: startIndex,
    taken: stopIndex - startIndex + 1,
    totalRecords: 150,
    records: result
  };

  // const results = await http.get('sponsors');
  // const sponsors = results.data.body as {};

  // return sponsors;
};
