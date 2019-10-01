import { useEffect, useState } from 'react';
import { Sponsor, PagedSet, EditorState } from './SponsorModels.d';
import * as Api from '../../services/sponsorService';
import { useParams } from 'react-router-dom';

const defaultSponsor = {
  name: '',
  blurb: '',
  contactInfo: '',
  shortBlurb: '',
  url: ''
};

const defaultSponsorPage: PagedSet<Sponsor> = {
  taken: 0,
  skipped: 0,
  records: [],
  totalRecords: 0
};

const defaultEditorState: EditorState<Sponsor> = {
  editId: 0,
  editView: defaultSponsor,
  mode: 'new'
};

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<PagedSet<Sponsor>>(defaultSponsorPage);
  const [sponsorForm, setSponsorForm] = useState<EditorState<Sponsor>>(defaultEditorState);

  let { id } = useParams();

  useEffect(() => {
    (async () => {
      const items = await Api.getSponsors(0, 50);
      setSponsors(items);
    })();
  }, []);

  useEffect(() => {
    if (typeof id !== 'undefined') {
      const intId = parseInt(id);
      const sponsor = sponsors.records.find(s => s.id === intId);

      if (sponsor) {
        setSponsorForm({ editView: sponsor, editId: intId, mode: 'edit' });
      }
    }
  }, [id, sponsors]);

  const isSponsorLoaded = (index: number) => {
    return typeof sponsors.records[index] !== 'undefined';
  };

  const loadMoreSponsors = async (startIndex: number, stopIndex: number) => {
    const loadedSponsors = await Api.getSponsors(startIndex, stopIndex);
    setSponsors(prev => {
      const newSponsorArray = [...sponsors.records];
      newSponsorArray.splice(startIndex, stopIndex - startIndex, ...loadedSponsors.records);
      return { ...sponsors, records: newSponsorArray };
    });
    return;
  };

  const updateSponsorContent = (key: string, value: string | boolean) => {
    setSponsorForm(current => ({ ...current, editView: ({ ...current.editView, [key]: value } as unknown) as Pick<Sponsor, keyof Sponsor> }));
  };

  const saveSponsor = async () => {
    if (sponsorForm.mode === 'new') {
      await Api.createSponsor(sponsorForm.editView);
    }

    if (sponsorForm.mode === 'edit') {
      await Api.updateSponsor(sponsorForm.editId, sponsorForm.editView);
    }
  };

  const deleteSponsor = async () => {
    await Api.deleteSponsor(sponsorForm.editId);
  };

  const createNewSponsor = () => {
    setSponsorForm({ editView: defaultSponsor, editId: 0, mode: 'edit' });
  };

  return {
    sponsors,
    isSponsorLoaded,
    loadMoreSponsors,
    sponsorForm,
    createNewSponsor,
    saveSponsor,
    updateSponsorContent,
    deleteSponsor
  };
};
