import { useEffect, useState } from 'react';
import { Sponsor } from './SponsorModels';
export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    (async () => {
      const items = Array.from({ length: 100 }, (v, k) => ({ name: `Sponsor ${k}` }));
      setSponsors(items);
    })();
  }, []);

  return { sponsors };
};
