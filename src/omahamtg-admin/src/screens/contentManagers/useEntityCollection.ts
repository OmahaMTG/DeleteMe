import { useEffect, useState } from 'react';
import { IApiService, PagedSet } from '../../services/serviceContracts';
import { entityCollection, entityBase, ListState } from './ContentManagerModels';

export const useEntityCollection = <T extends entityBase>(apiService: IApiService<T>, defaultEntity: Omit<T, 'id'>): entityCollection<T> => {
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

  const [listState, setListState] = useState<ListState<T>>(defaultListState);

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

  return {
    isEntityLoaded,
    loadMoreEntities,
    updateSearchFilter,
    applySearchFilter,
    clearSearchFilter,
    listState
  };
};
