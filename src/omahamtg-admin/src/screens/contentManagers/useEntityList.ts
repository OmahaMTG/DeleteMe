import { useEffect, useState, createContext } from 'react';
import { ListState, PagedSet } from './SponsorModels.d';
import createUseContext from 'constate';
import { IApiService } from '../../services/serviceContracts';

export interface ListState<T> {
  resultSet: PagedSet<T>;
  state: 'initializing' | 'ready' | 'error';
  filter: string;
  appliedFilter: string;
}

export const useEntityList = <T>(apiService: IApiService<T>, defaultEntity: T) => {
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


export const EntityListContext = createContext(null);

export const EntityListProvider = <T>(apiService: IApiService<T>, defaultEntity: T) =>{
  const hook = useEntityList(apiService, defaultEntity);
return (
    <EntityListContext.Provider value={hook}>
    {children}
  </EntityListContext.Provider>
)

};1