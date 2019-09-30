import { useEffect, useState } from 'react';
import { Sponsor, PagedSet, defaultSponsorPage } from './SponsorModels.d';
import { getSponsors, createSponsor, updateSponsor } from '../../services/sponsorService';
import { number } from 'prop-types';
import { useParams } from 'react-router-dom';

const defaultSponsor = {
  name: '',
  blurb: '',
  contactInfo: '',
  shortBlurb: '',
  url: ''
};

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<PagedSet<Sponsor>>(defaultSponsorPage);
  const [currentSponsorForm, setCurrentSponsorForm] = useState<Omit<Sponsor, 'id'>>(defaultSponsor);
  const [formMode, setFormMode] = useState<{ editId: number; mode: 'edit' | 'new' }>({ editId: 0, mode: 'new' });
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      const items = await getSponsors(0, 50);
      setSponsors(items);
    })();
  }, []);

  useEffect(() => {
    //(async () => {
    if (typeof id !== 'undefined') {
      const intId = parseInt(id);
      const sponsor = sponsors.records.find(s => s.id === intId);

      if (sponsor) {
        setCurrentSponsorForm(sponsor);
        setFormMode({ editId: intId, mode: 'edit' });
      }
    }

    // const items = await getSponsors(0, 50);
    // setSponsors(items);
    //  })();
  }, [id, sponsors]);

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

  const editSponsor = (sponsorId: number) => {
    const sponsor = sponsors.records.find(s => s.id === sponsorId);

    if (sponsor) {
      setCurrentSponsorForm(sponsor);
      setFormMode({ editId: sponsorId, mode: 'edit' });
    }
  };

  const updateSponsorContent = (key: string, value: string | boolean) => {
    setCurrentSponsorForm(current => (({ ...current, [key]: value } as unknown) as Pick<Sponsor, keyof Sponsor>));
  };

  const saveSponsor = () => {
    if (formMode.mode === 'new') {
      createSponsor(currentSponsorForm);
    }

    if (formMode.mode === 'edit') {
      updateSponsor(formMode.editId, currentSponsorForm);
    }
  };

  const deleteSponsor = () => {};

  const createNewSponsor = () => {
    setCurrentSponsorForm(defaultSponsor);
    setFormMode({ editId: 0, mode: 'new' });
  };

  return {
    sponsors,
    isSponsorLoaded,
    loadMoreSponsors,
    currentSponsorForm,
    createNewSponsor,
    saveSponsor,
    editSponsor,
    updateSponsorContent,
    formMode
  };
};
