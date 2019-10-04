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
  mode: 'new',
  editorMessage: ''
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
        setSponsorFormState(cur => ({ ...cur, editView: sponsor, editId: intId, mode: 'edit' }));
      }
    } else {
      setSponsorFormState(defaultEditorState);
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
      const newSponsor = await Api.createSponsor(sponsorFormState.editView);
      setSponsorFormState(cur => ({ ...cur, editId: newSponsor.id, mode: 'edit' }));
    }

    if (sponsorFormState.mode === 'edit') {
      await Api.updateSponsor(sponsorFormState.editId, sponsorFormState.editView);
    }
    setFormMessage(`Saved Sponsor: ${sponsorFormState.editView.name}`);
  };

  const deleteSponsor = async () => {
    // const deletes = sponsorListState.resultSet.records.map(s => Api.deleteSponsor(s.id));

    // await Promise.all(deletes);
    await Api.deleteSponsor(sponsorFormState.editId);
    setSponsorFormState(cur => defaultEditorState);
    setFormMessage(`Deleted Sponsor: ${sponsorFormState.editView.name}`);
  };

  // const createNewSponsor = () => {
  //   setSponsorFormState(cur => ({ ...cur, editView: defaultSponsor, editId: 0, mode: 'edit' }));
  // };

  const clearSearchFilter = () => {
    setSponsorListState(cur => ({ ...cur, filter: '', appliedFilter: '' }));
  };

  const setFormMessage = (message: string) => {
    setSponsorFormState(cur => ({ ...cur, editorMessage: message }));
    setTimeout(() => setSponsorFormState(cur => ({ ...cur, editorMessage: '' })), 2500);
  };

  return {
    sponsorListState,
    isSponsorLoaded,
    loadMoreSponsors,
    sponsorFormState,
    saveSponsor,
    updateSponsorContent,
    deleteSponsor,
    updateSearchFilter,
    applySearchFilter,
    clearSearchFilter
  };
};
