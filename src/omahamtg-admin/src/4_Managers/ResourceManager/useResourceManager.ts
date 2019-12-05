import { IResourceManager } from './contracts/IResourceManager';
import { IWithSetFormState } from './contracts/IWithSetFormState';
import { IResourceAccessor } from '../../6_Accessors/ResourceAccessor/IResourceAccessor';
import { resourceBase } from '../../3_Contracts';
import { buildDefaultCollectionState } from './buildDefaultCollectionState';
import { buildDefaultFormState } from './buildDefaultFormState';
import { useState, useEffect } from 'react';
import { IResourceCollectionState } from './contracts/IResourceCollectionState';
import { IResourceFormState } from './contracts/IResourceFormState';
import { useParams, useHistory } from 'react-router';

const useResourceManager = <T extends resourceBase>(
  apiService: IResourceAccessor<T>,
  defaultResource: Omit<T, 'id'>,
  uIRouteRoot: string
): IResourceManager<T> & IWithSetFormState<T> => {
  // #region Collections
  const [collectionState, setCollectionState] = useState<IResourceCollectionState<T>>(buildDefaultCollectionState<T>());

  useEffect(() => {
    (async () => {
      setCollectionState(cur => ({ ...cur, state: 'initializing' }));
      const items = await apiService.queryResources(0, 50, collectionState.appliedFilter);
      setCollectionState(cur => ({ ...cur, resultSet: items, state: 'ready' }));
    })();
  }, [collectionState.appliedFilter, apiService]);

  const isResourceLoaded = (index: number) => {
    return typeof collectionState.resultSet.records[index] !== 'undefined';
  };

  const loadMoreResources = async (startIndex: number, stopIndex: number) => {
    const loadedSponsors = await apiService.queryResources(startIndex, stopIndex, collectionState.appliedFilter);
    setCollectionState(cur => {
      const newSponsorArray = [...cur.resultSet.records];
      newSponsorArray.splice(startIndex, stopIndex - startIndex, ...loadedSponsors.records);

      return { ...cur, list: { ...cur, resultSet: { ...cur.resultSet, records: newSponsorArray } } };
    });
  };

  const updateSearchFilter = (value: string) => {
    setCollectionState(cur => ({ ...cur, filter: value }));
  };

  const applySearchFilter = () => {
    setCollectionState(cur => ({ ...cur, appliedFilter: cur.filter }));
  };

  const clearSearchFilter = () => {
    setCollectionState(cur => ({ ...cur, filter: '', appliedFilter: '' }));
  };

  //#endregion
  // #region forms
  const [formState, setFormState] = useState<IResourceFormState<T>>(buildDefaultFormState<T>(defaultResource));
  const [formMessage, setFormMessage] = useState<string>();
  let history = useHistory();

  let { id } = useParams();
  useEffect(() => {
    console.log('id changed?', id);
    if (typeof id !== 'undefined') {
      const intId = parseInt(id);
      const resource = collectionState.resultSet.records.find(s => s.id === intId);
      if (resource) {
        setFormState(cur => ({ ...cur, editView: resource, editId: intId, mode: 'edit' }));
      }
    } else {
      setFormState(cur => ({ ...cur, editView: defaultResource, mode: 'new' }));
    }
  }, [id, collectionState.resultSet.records, defaultResource]);

  // const updateResourceProperty = (changeEvent: { key: string; value: string | boolean | number | Date }) => {
  //   setFormState(cur => ({
  //     ...cur,
  //     editView: ({ ...cur.editView, [changeEvent.key]: changeEvent.value } as unknown) as Pick<T, keyof T>
  //   }));
  // };

  const updateResourceProperty = <K extends keyof T>(changeEvent: { name: K; value?: T[K] }) => {
    setFormState(cur => ({
      ...cur,
      editView: { ...cur.editView, [changeEvent.name]: changeEvent.value }
    }));
  };

  const saveResource = async () => {
    if (formState.mode === 'new') {
      await saveCreateResource();
    }

    if (formState.mode === 'edit') {
      await saveEditResource();
    }
  };

  const saveCreateResource = async () => {
    setFormState(cur => ({ ...cur, state: 'saving' }));
    const newSponsor = await apiService.createResource(formState.editView);

    setCollectionState(cur => ({
      ...cur,
      resultSet: { ...cur.resultSet, records: [...cur.resultSet.records, newSponsor], totalRecords: cur.resultSet.totalRecords + 1 }
    }));

    setFormState(cur => ({
      ...cur,
      state: 'idle'
    }));

    assignFormMessage(`Created New Sponsor`);
    history.push(`${uIRouteRoot}/${newSponsor.id}`);
  };

  const saveEditResource = async () => {
    setFormState(cur => ({ ...cur, state: 'saving' }));
    const idToUpdate = formState.editId;
    const updated = await apiService.updateResource(idToUpdate, formState.editView);

    setCollectionState(cur => ({
      ...cur,
      resultSet: {
        ...cur.resultSet,
        records: cur.resultSet.records.map(f => (f.id === idToUpdate ? updated : f))
      }
    }));

    setFormState(cur => ({
      ...cur,

      state: 'idle'
    }));
    assignFormMessage(`Saved`);
  };

  const deleteResource = async () => {
    const idToDelete = formState.editId;
    setFormState(cur => ({ ...cur, state: 'saving' }));
    await apiService.deleteResource(idToDelete, false);

    setFormState(cur => ({
      ...cur,
      editor: buildDefaultFormState(defaultResource),
      state: 'idle'
    }));

    setCollectionState(cur => ({
      ...cur,
      resultSet: {
        ...cur.resultSet,
        totalRecords: cur.resultSet.totalRecords - 1,
        records: cur.resultSet.records.filter(f => f.id !== idToDelete)
      }
    }));

    assignFormMessage(`Deleted Sponsor`);
    history.push(`${uIRouteRoot}`);
  };

  const assignFormMessage = (message: string) => {
    setFormMessage(message);
    setTimeout(() => setFormMessage(undefined), 2500);
  };
  // #endregion

  return {
    resourceCollectionManager: { collectionState, updateSearchFilter, applySearchFilter, clearSearchFilter, loadMoreResources, isResourceLoaded },
    resourceFormManager: { deleteResource, saveResource, formState, formMessage, updateResourceProperty },
    setFormState
  };
};

export { useResourceManager };
