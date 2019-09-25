import { useEffect, useState } from 'react';
import { Sponsor, PagedSet, defaultSponsorPage } from './SponsorModels.d';
import { getSponsors } from '../../services/sponsorService';
export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<PagedSet<Sponsor>>(defaultSponsorPage);
  // const [formState, setFormState] = useState<Sponsor>();

  useEffect(() => {
    (async () => {
      const items = await getSponsors(0, 50);
      setSponsors(items);
    })();
  }, []);

  const isSponsorLoaded = (index: number) => {
    return typeof sponsors.records[index] !== 'undefined';
  };

  const loadMoreSponsors = async (startIndex: number, stopIndex: number) => {
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
