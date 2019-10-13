import { useEffect, useState, useMemo } from 'react';
import { IApiService } from '../../services/serviceContracts';
import { entityCollection, entityBase, ListState, EditorState, EntityCollectionState } from './ContentManagerModels';
import { useParams, useHistory } from 'react-router';

export const useEntityCollection = <T extends entityBase>(
  apiService: IApiService<T>,
  defaultEntity: Omit<T, 'id'>,
  uIRouteRoot: string
): entityCollection<T> => {
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
      state: 'idle'
    }),
    [defaultEntity]
  );

  const defaultCollectionState = { editor: defaultEditorState, list: defaultListState };

  const [collectionState, setCollectionState] = useState<EntityCollectionState<T>>(defaultCollectionState);
  const [formMessage, setFormMessage] = useState<string>();
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    (async () => {
      setCollectionState(cur => ({ ...cur, list: { ...cur.list, state: 'initializing' } }));
      const items = await apiService.queryEntities(0, 50, collectionState.list.appliedFilter);
      setCollectionState(cur => ({ ...cur, list: { ...cur.list, resultSet: items, state: 'ready' } }));
    })();
  }, [collectionState.list.appliedFilter, apiService]);

  useEffect(() => {
    if (typeof id !== 'undefined') {
      const intId = parseInt(id);
      const sponsor = collectionState.list.resultSet.records.find(s => s.id === intId);
      if (sponsor) {
        setCollectionState(cur => ({ ...cur, editor: { ...cur.editor, editView: sponsor, editId: intId, mode: 'edit' } }));
      }
    } else {
      setCollectionState(cur => ({ ...cur, editor: defaultEditorState }));
    }
  }, [id, collectionState.list.resultSet.records, defaultEditorState]);

  const isEntityLoaded = (index: number) => {
    return typeof collectionState.list.resultSet.records[index] !== 'undefined';
  };

  const loadMoreEntities = async (startIndex: number, stopIndex: number) => {
    const loadedSponsors = await apiService.queryEntities(startIndex, stopIndex, collectionState.list.appliedFilter);
    setCollectionState(cur => {
      const newSponsorArray = [...cur.list.resultSet.records];
      newSponsorArray.splice(startIndex, stopIndex - startIndex, ...loadedSponsors.records);

      return { ...cur, list: { ...cur.list, resultSet: { ...cur.list.resultSet, records: newSponsorArray } } };
    });
  };

  const updateSearchFilter = (value: string) => {
    setCollectionState(cur => ({ ...cur, list: { ...cur.list, filter: value } }));
  };

  const applySearchFilter = () => {
    setCollectionState(cur => ({ ...cur, list: { ...cur.list, appliedFilter: cur.list.filter } }));
  };

  const clearSearchFilter = () => {
    setCollectionState(cur => ({ ...cur, list: { ...cur.list, filter: '', appliedFilter: '' } }));
  };

  const updateEntityContent = (key: string, value: string | boolean) => {
    setCollectionState(cur => ({
      ...cur,
      editor: { ...cur.editor, editView: ({ ...cur.editor.editView, [key]: value } as unknown) as Pick<T, keyof T> }
    }));
  };

  const saveEntity = async () => {
    if (collectionState.editor.mode === 'new') {
      await saveCreateEntity();
    }

    if (collectionState.editor.mode === 'edit') {
      await saveEditEntity();
    }
  };

  const saveCreateEntity = async () => {
    setCollectionState(cur => ({ ...cur, editor: { ...cur.editor, state: 'saving' } }));
    const newSponsor = await apiService.createEntity(collectionState.editor.editView);

    //setFormState(cur => ({ ...cur, editId: newSponsor.id, mode: 'edit' }));
    console.log({ records: [...collectionState.list.resultSet.records, newSponsor], totalRecords: collectionState.list.resultSet.totalRecords + 1 });
    setCollectionState(cur => ({
      ...cur,
      list: {
        ...cur.list,
        resultSet: { ...cur.list.resultSet, records: [...cur.list.resultSet.records, newSponsor], totalRecords: cur.list.resultSet.totalRecords + 1 }
      },
      editor: { ...cur.editor, state: 'idle' }
    }));

    assignFormMessage(`Saved`);
    history.push(`${uIRouteRoot}/${newSponsor.id}`);
  };

  const saveEditEntity = async () => {
    setCollectionState(cur => ({ ...cur, editor: { ...cur.editor, state: 'saving' } }));
    const idToUpdate = collectionState.editor.editId;
    const updated = await apiService.updateEntity(idToUpdate, collectionState.editor.editView);

    setCollectionState(cur => ({
      ...cur,
      list: {
        ...cur.list,
        resultSet: {
          ...cur.list.resultSet,
          records: cur.list.resultSet.records.map(f => (f.id === idToUpdate ? updated : f))
        }
      },
      editor: {
        ...cur.editor,
        state: 'idle'
      }
    }));
    assignFormMessage(`Saved`);
  };

  const deleteEntity = async () => {
    const idToDelete = collectionState.editor.editId;
    setCollectionState(cur => ({ ...cur, editor: { ...cur.editor, state: 'saving' } }));
    await apiService.deleteEntity(idToDelete, false);

    setCollectionState(cur => ({
      ...cur,
      list: {
        ...cur.list,
        resultSet: {
          ...cur.list.resultSet,
          totalRecords: cur.list.resultSet.totalRecords - 1,
          records: cur.list.resultSet.records.filter(f => f.id !== idToDelete)
        }
      },
      editor: defaultEditorState
    }));

    assignFormMessage(`Deleted`);
  };

  const assignFormMessage = (message: string) => {
    setFormMessage(message);
    setTimeout(() => setFormMessage(undefined), 2500);
  };

  return {
    isEntityLoaded,
    loadMoreEntities,
    updateSearchFilter,
    applySearchFilter,
    clearSearchFilter,
    listState: collectionState.list,
    updateEntityContent,
    saveEntity,
    deleteEntity,
    formState: collectionState.editor,
    formMessage
  };
};
