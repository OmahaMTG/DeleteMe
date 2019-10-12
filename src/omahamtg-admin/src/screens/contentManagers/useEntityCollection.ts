import { useEffect, useState, useMemo } from 'react';
import { IApiService } from '../../services/serviceContracts';
import { entityCollection, entityBase, ListState, idlessEntity, EditorState } from './ContentManagerModels';
import { useParams, useHistory } from 'react-router';
import { cursorTo } from 'readline';

export const useEntityCollection = <T extends entityBase>(apiService: IApiService<T>, defaultEntity: idlessEntity): entityCollection<T> => {
  const defaultListState: ListState<T> = {
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

  const defaultEditorState: EditorState<T> = useMemo(
    () => ({
      editId: 0,
      editView: defaultEntity,
      mode: 'new',
      editorMessage: ''
    }),
    [defaultEntity]
  );

  const [listState, setListState] = useState<ListState<T>>(defaultListState);
  const [formState, setFormState] = useState<EditorState<T>>(defaultEditorState);
  let { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    (async () => {
      setListState(current => ({ ...current, state: 'initializing' }));
      const items = await apiService.queryEntities(0, 50, listState.appliedFilter);
      setListState(current => ({ ...current, resultSet: items, state: 'ready' }));
    })();
  }, [listState.appliedFilter, apiService]);

  const isEntityLoaded = (index: number) => {
    return typeof listState.resultSet.records[index] !== 'undefined';
  };

  useEffect(() => {
    if (typeof id !== 'undefined') {
      const intId = parseInt(id);
      const sponsor = listState.resultSet.records.find(s => s.id === intId);
      if (sponsor) {
        setFormState(cur => ({ ...cur, editView: sponsor, editId: intId, mode: 'edit' }));
      }
    } else {
      setFormState(defaultEditorState);
    }
  }, [id, listState.resultSet.records, defaultEditorState]);

  const loadMoreEntities = async (startIndex: number, stopIndex: number) => {
    const loadedSponsors = await apiService.queryEntities(startIndex, stopIndex, listState.appliedFilter);
    setListState(current => {
      const newSponsorArray = [...current.resultSet.records];
      newSponsorArray.splice(startIndex, stopIndex - startIndex, ...loadedSponsors.records);
      return { ...current, resultSet: { ...current.resultSet, records: newSponsorArray } };
    });
    return;
  };

  const updateSearchFilter = (value: string) => {
    setListState(current => ({ ...current, filter: value }));
  };

  const applySearchFilter = () => {
    setListState(current => ({ ...current, appliedFilter: current.filter }));
  };

  const clearSearchFilter = () => {
    setListState(cur => ({ ...cur, filter: '', appliedFilter: '' }));
  };

  const updateEntityContent = (key: string, value: string | boolean) => {
    setFormState(current => ({ ...current, editView: ({ ...current.editView, [key]: value } as unknown) as Pick<T, keyof T> }));
  };

  const saveEntity = async () => {
    if (formState.mode === 'new') {
      //   setFormMessage(`Saving...`);
      const newSponsor = await apiService.createEntity(formState.editView);

      //setFormState(cur => ({ ...cur, editId: newSponsor.id, mode: 'edit' }));
      history.push(`/Sponsor/${newSponsor.id}`);
      setListState(current => {
        return {
          ...current,
          resultSet: { ...current.resultSet, records: [...current.resultSet.records, newSponsor], totalRecords: current.resultSet.totalRecords + 1 }
        };
      });
    }

    if (formState.mode === 'edit') {
      const idToUpdate = formState.editId;
      const updated = await apiService.updateEntity(idToUpdate, formState.editView);

      setListState(cur => ({
        ...cur,
        resultSet: {
          ...cur.resultSet,
          records: cur.resultSet.records.map(f => (f.id === idToUpdate ? updated : f))
        }
      }));
    }
    //  setFormMessage(`Saved Sponsor`);
  };

  const deleteEntity = async () => {
    const idToDelete = formState.editId;
    await apiService.deleteEntity(idToDelete, false);
    setListState(cur => ({
      ...cur,
      resultSet: {
        ...cur.resultSet,
        totalRecords: cur.resultSet.totalRecords - 1,
        records: cur.resultSet.records.filter(f => f.id !== idToDelete)
      }
    }));
    setFormState(cur => defaultEditorState);
    setFormMessage(`Deleted Sponsor`);
  };

  const setFormMessage = (message: string) => {
    setFormState(cur => ({ ...cur, editorMessage: message }));
    setTimeout(() => setFormState(cur => ({ ...cur, editorMessage: '' })), 2500);
  };

  return {
    isEntityLoaded,
    loadMoreEntities,
    updateSearchFilter,
    applySearchFilter,
    clearSearchFilter,
    listState,
    updateEntityContent,
    saveEntity,
    deleteEntity,
    formState
  };
};
