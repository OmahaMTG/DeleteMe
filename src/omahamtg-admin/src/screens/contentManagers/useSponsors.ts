import { useEffect, useState } from 'react';
import { Sponsor, PagedSet, defaultSponsorPage } from './SponsorModels';
import { getSponsors } from '../../services/sponsorService';
export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<PagedSet<Sponsor>>(defaultSponsorPage);

  useEffect(() => {
    (async () => {
      const items = await getSponsors(0, 50);
      setSponsors(items);
    })();
  }, []);

  const isSponsorLoaded = (index: number) => {
    console.log('isSponsorLoaded', { loaded: typeof sponsors.records[index] !== 'undefined', value: sponsors.records[index] });
    return typeof sponsors.records[index] !== 'undefined';
    //   return true;
  };

  const loadMoreSponsors = async (startIndex: number, stopIndex: number) => {
    console.log('loadMoreSponsors', { startIndex, stopIndex });

    const loadedSponsors = await getSponsors(startIndex, stopIndex);

    setSponsors(prev => {
      const newSponsorArray = [...sponsors.records];
      newSponsorArray.splice(startIndex, stopIndex - startIndex, ...loadedSponsors.records);

      return { ...sponsors, records: newSponsorArray };
    });
    return;
  };
  return { sponsors, isSponsorLoaded, loadMoreSponsors };
};
