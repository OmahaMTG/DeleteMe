import { useEffect, useState } from 'react';
import { Sponsor, EditorState, ListState } from './SponsorModels.d';
import * as Api from '../../services/sponsorService';
import { useParams } from 'react-router-dom';

const defaultSponsor = {
  name: '',
  blurb: '',
  contactInfo: '',
  shortBlurb: '',
  url: ''
};

const defaultListState: ListState<Sponsor> = {
  resultSet: {
    taken: 0,
    skipped: 0,
    records: [],
    totalRecords: 0
  },
  state: 'initializing',
  filter: '',
  appliedFilter: ''
};

const defaultEditorState: EditorState<Sponsor> = {
  editId: 0,
  editView: defaultSponsor,
  mode: 'new'
};

export const useSponsors = () => {
  const [sponsorListState, setSponsorListState] = useState<ListState<Sponsor>>(defaultListState);
  const [sponsorFormState, setSponsorFormState] = useState<EditorState<Sponsor>>(defaultEditorState);

  let { id } = useParams();

  useEffect(() => {
    (async () => {
      setSponsorListState(current => ({ ...current, state: 'initializing' }));
      const items = await Api.getSponsors(0, 50, sponsorListState.appliedFilter);
      setSponsorListState(current => ({ ...current, resultSet: items, state: 'ready' }));
    })();
  }, [sponsorListState.appliedFilter]);

  useEffect(() => {
    if (typeof id !== 'undefined') {
      const intId = parseInt(id);
      const sponsor = sponsorListState.resultSet.records.find(s => s.id === intId);

      if (sponsor) {
        setSponsorFormState({ editView: sponsor, editId: intId, mode: 'edit' });
      }
    }
  }, [id, sponsorListState.resultSet.records]);

  const isSponsorLoaded = (index: number) => {
    return typeof sponsorListState.resultSet.records[index] !== 'undefined';
  };

  const loadMoreSponsors = async (startIndex: number, stopIndex: number) => {
    const loadedSponsors = await Api.getSponsors(startIndex, stopIndex, sponsorListState.appliedFilter);
    setSponsorListState(current => {
      const newSponsorArray = [...current.resultSet.records];
      newSponsorArray.splice(startIndex, stopIndex - startIndex, ...loadedSponsors.records);
      return { ...current, resultSet: { ...current.resultSet, records: newSponsorArray } };
    });
    return;
  };

  const updateSponsorContent = (key: string, value: string | boolean) => {
    setSponsorFormState(current => ({ ...current, editView: ({ ...current.editView, [key]: value } as unknown) as Pick<Sponsor, keyof Sponsor> }));
  };

  const updateSearchFilter = (value: string) => {
    setSponsorListState(current => ({ ...current, filter: value }));
  };

  const applySearchFilter = () => {
    setSponsorListState(current => ({ ...current, appliedFilter: current.filter }));
  };

  const saveSponsor = async () => {
    if (sponsorFormState.mode === 'new') {
      await Api.createSponsor(sponsorFormState.editView);
    }

    if (sponsorFormState.mode === 'edit') {
      await Api.updateSponsor(sponsorFormState.editId, sponsorFormState.editView);
    }
  };

  const deleteSponsor = async () => {
    await Api.deleteSponsor(sponsorFormState.editId);
  };

  const createNewSponsor = () => {
    setSponsorFormState({ editView: defaultSponsor, editId: 0, mode: 'edit' });
  };

  const clearSearchFilter = () => {
    setSponsorListState(cur => ({ ...cur, filter: '', appliedFilter: '' }));
  };

  return {
    sponsorListState,
    isSponsorLoaded,
    loadMoreSponsors,
    sponsorFormState,
    createNewSponsor,
    saveSponsor,
    updateSponsorContent,
    deleteSponsor,
    updateSearchFilter,
    applySearchFilter,
    clearSearchFilter
  };
};
